import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService, GithubUser, GithubRepo } from '../../services/github';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-github-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github-stats.html',
  styleUrl: './github-stats.css',
})
export class GithubStats implements OnInit {
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
    this.isLoading = true;
    this.error = null;
    this.hasError = false;

    this.githubService.getUserStats(username).subscribe({
      next: (stats) => {
        if (!stats.user) {
          this.hasError = true;
          this.error = 'Impossible de charger les informations du profil GitHub.';
        } else if (stats.repos.length === 0) {
          this.hasError = true;
          this.error = 'Aucun dépôt public trouvé pour cet utilisateur.';
        } else {
          this.user = stats.user;
          this.repos = stats.repos;
          this.topLanguages = stats.topLanguages;
          this.totalStars = stats.totalStars;
          this.totalForks = stats.totalForks;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des stats GitHub:', err);
        this.hasError = true;
        this.error = 'Erreur lors de la connexion à GitHub. Veuillez vérifier votre connexion ou réessayer plus tard.';
        this.isLoading = false;
      }
    });
  }

  getTopLanguages(): { name: string; count: number }[] {
    return Object.entries(this.topLanguages)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Afficher les 5 langages les plus utilisés
  }
}
