import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { GithubUser, GithubRepo } from '../../services/github.models';
import { Subject, takeUntil } from 'rxjs';
  
@Component({
  selector: 'app-github-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github-stats.html',
  styleUrl: './github-stats.css',
})
export class GithubStats implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  user: GithubUser | null = null;
  hasError = false;
  repos: GithubRepo[] = [];
  topLanguages: { [key: string]: number } = {};
  totalStars = 0;
  totalForks = 0;
  isLoading = true;
  error: string | null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.loadGithubStats('224rifche'); // nom d'utilisateur GitHub
  }

  loadGithubStats(username: string): void {
    if (!username?.trim()) {
      this.handleError(new Error('Le nom d\'utilisateur GitHub est requis'));
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.hasError = false;

    this.githubService.getUserStats(username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => this.handleStatsSuccess(stats),
        error: (err) => this.handleError(err)
      });
  }

  private handleStatsSuccess(stats: any) {
    if (!stats?.user) {
      throw new Error('Aucune donnée utilisateur disponible');
    }

    this.user = stats.user;
    this.repos = stats.repos || [];
    this.topLanguages = stats.topLanguages || {};
    this.totalStars = stats.totalStars || 0;
    this.totalForks = stats.totalForks || 0;
    this.isLoading = false;
  }

  private handleError(error: any) {
    console.error('Erreur GitHub:', error);
    this.hasError = true;
    this.isLoading = false;
    
    if (error?.message?.includes('rate limit')) {
      this.error = 'Limite de requêtes API atteinte. Veuillez réessayer plus tard.';
    } else if (error?.status === 404) {
      this.error = 'Utilisateur non trouvé. Vérifiez le nom d\'utilisateur.';
    } else if (error?.message) {
      this.error = error.message;
    } else {
      this.error = 'Erreur lors de la récupération des données GitHub. Veuillez réessayer.';
    }
  }

  getTopLanguages(): { name: string; count: number }[] {
    return Object.entries(this.topLanguages)
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Afficher les 5 langages les plus utilisés
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export default GithubStats;
