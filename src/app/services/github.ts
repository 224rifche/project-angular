import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, shareReplay, catchError, of, tap } from 'rxjs';

export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  company?: string;
  location?: string;
  email?: string;
  blog?: string;
  twitter_username?: string;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const CACHE_SIZE = 1;
const CACHE_TTL = 300000; // 5 minutes en millisecondes

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.github.com';

  // Cache pour les requêtes
  private cache = new Map<string, { data: any, expiry: number }>();

  // Cache pour les observables partagés
  private userCache = new Map<string, Observable<GithubUser | null>>();
  private reposCache = new Map<string, Observable<GithubRepo[]>>();

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() < cached.expiry) {
      return cached.data as T;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + CACHE_TTL
    });
  }

  getUser(username: string): Observable<GithubUser | null> {
    const cacheKey = `user_${username}`;
    const cachedData = this.getFromCache<GithubUser>(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    if (!this.userCache.has(cacheKey)) {
      const request$ = this.http.get<GithubUser>(`${this.apiUrl}/users/${username}`).pipe(
        tap(user => this.setCache(cacheKey, user)),
        shareReplay(1, CACHE_TTL),
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
          return of(null);
        })
      );
      this.userCache.set(cacheKey, request$);
    }

    return this.userCache.get(cacheKey)!;
  }

  getUserRepos(username: string, page = 1, perPage = 6): Observable<GithubRepo[]> {
    const cacheKey = `repos_${username}_${page}_${perPage}`;
    const cachedData = this.getFromCache<GithubRepo[]>(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    if (!this.reposCache.has(cacheKey)) {
      const params = new HttpParams()
        .set('sort', 'updated')
        .set('page', page.toString())
        .set('per_page', perPage.toString());

      const request$ = this.http.get<GithubRepo[]>(`${this.apiUrl}/users/${username}/repos`, { params }).pipe(
        tap(repos => this.setCache(cacheKey, repos)),
        shareReplay(1, CACHE_TTL),
        catchError(error => {
          console.error('Erreur lors de la récupération des dépôts:', error);
          return of([]);
        })
      );
      this.reposCache.set(cacheKey, request$);
    }

    return this.reposCache.get(cacheKey)!;
  }

  private getTopLanguages(repos: GithubRepo[]): { [key: string]: number } {
    return repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });
  }

  private calculateTotals(repos: GithubRepo[]): { totalStars: number; totalForks: number } {
    return repos.reduce(
      (acc, repo) => ({
        totalStars: acc.totalStars + repo.stargazers_count,
        totalForks: acc.totalForks + repo.forks_count
      }),
      { totalStars: 0, totalForks: 0 }
    );
  }

  getUserStats(username: string): Observable<{
    user: GithubUser | null;
    repos: GithubRepo[];
    topLanguages: { [key: string]: number };
    totalStars: number;
    totalForks: number;
  }> {
    return forkJoin({
      user: this.getUser(username).pipe(catchError(() => of(null))),
      repos: this.getUserRepos(username, 1, 6) // Seulement les 6 premiers dépôts
    }).pipe(
      map(({ user, repos }) => {
        const { totalStars, totalForks } = this.calculateTotals(repos);
        const topLanguages = this.getTopLanguages(repos);

        return {
          user,
          repos,
          topLanguages,
          totalStars,
          totalForks
        };
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des stats GitHub:', error);
        return of({
          user: null,
          repos: [],
          topLanguages: {},
          totalStars: 0,
          totalForks: 0
        });
      })
    );
  }
}