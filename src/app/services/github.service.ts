import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GithubUser, GithubRepo } from './github.models';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://api.github.com';
  private cache = new Map<string, { data: any, timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  
  private getHeaders() {
    console.warn('Mode sans token activé. Les requêtes seront limitées par le taux de l\'API GitHub.');
    return new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json'
    });
  }

  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp < this.CACHE_DURATION)) {
      console.log('Utilisation du cache pour:', key);
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.status === 403) {
      const resetTime = error.headers.get('X-RateLimit-Reset');
      if (resetTime) {
        const resetDate = new Date(parseInt(resetTime) * 1000);
        errorMessage = `Limite de requêtes API atteinte. Réessayez après ${resetDate.toLocaleTimeString()}`;
      } else {
        errorMessage = 'Limite de requêtes API atteinte. Veuillez réessayer plus tard.';
      }
    } else if (error.status === 404) {
      errorMessage = 'Ressource non trouvée. Vérifiez le nom d\'utilisateur ou le dépôt.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('Erreur GitHub:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getUserStats(username: string) {
    const cacheKey = `user_${username}_stats`;
    const cachedData = this.getCachedData(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return forkJoin({
      user: this.getUser(username),
      repos: this.getUserRepos(username)
    }).pipe(
      map(({ user, repos }) => {
        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }

        const stats = {
          user,
          repos: repos.slice(0, 6),
          ...this.calculateRepoStats(repos)
        };

        this.setCachedData(cacheKey, stats);
        return stats;
      }),
      catchError(this.handleError.bind(this)),
      shareReplay(1)
    );
  }

  

  private getUser(username: string) {
    return this.http.get<GithubUser>(`${this.apiUrl}/users/${username}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(() => of(null))
    );
  }

  private getUserRepos(username: string) {
    return this.http.get<GithubRepo[]>(
      `${this.apiUrl}/users/${username}/repos?sort=updated&per_page=100`,
      { headers: this.getHeaders() }
    ).pipe(
      map(repos => 
        repos
          .filter(repo => !repo.fork && !repo.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
      ),
      catchError(() => of([]))
    );
  }

  // Méthode pour récupérer les dépôts (utilisée par le composant projects)
  getRepos(username: string): Observable<GithubRepo[]> {
    const headers = this.getHeaders();
    return this.http.get<GithubRepo[]>(
      `${this.apiUrl}/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    ).pipe(
      map(repos => 
        repos
          .filter(repo => !repo.fork && !repo.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
      ),
      catchError((error) => {
        console.error('Erreur lors de la récupération des dépôts GitHub:', error);
        return of([]);
      })
    );
  }

  getRepoStats(username: string, repo: string): Observable<{stars: number, forks: number, watchers: number} | null> {
  const headers = this.getHeaders();
  
  return this.http.get<{
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
  }>(
    `${this.apiUrl}/repos/${username}/${repo}`,
    { headers }
  ).pipe(
    map(data => ({
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count
    })),
    catchError(error => {
      console.error(`Erreur lors de la récupération des stats pour ${username}/${repo}:`, error);
      // Retourne des valeurs par défaut au lieu de null
      return of({
        stars: 0,
        forks: 0,
        watchers: 0
      });
    })
  );
}

  private calculateRepoStats(repos: GithubRepo[]) {
    const topLanguages: { [key: string]: number } = {};
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach(repo => {
      // Compter les langages
      if (repo.language) {
        topLanguages[repo.language] = (topLanguages[repo.language] || 0) + 1;
      }

      // Compter les étoiles et les forks
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
    });

    return { topLanguages, totalStars, totalForks };
  }
}
