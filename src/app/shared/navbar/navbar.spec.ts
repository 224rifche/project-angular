import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export interface GithubStats {
  stars: number;
  forks: number;
  watchers: number;
  open_issues: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private username = '224rifche';
  private repo = 'mon-portfolio';

  constructor(private http: HttpClient) { }

  getRepoStats(): Observable<GithubStats> {
    return this.http.get(`${this.apiUrl}/repos/${this.username}/${this.repo}`).pipe(
      map((data: any) => ({
        stars: data.stargazers_count,
        forks: data.forks_count,
        watchers: data.watchers_count,
        open_issues: data.open_issues_count
      })),
      catchError(error => {
        console.error('Error fetching GitHub stats:', error);
        return of({
          stars: 0,
          forks: 0,
          watchers: 0,
          open_issues: 0
        });
      })
    );
  }
}