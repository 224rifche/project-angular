// projects/projects.ts
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { GithubService } from '../../services/github.service';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {
  private githubService = inject(GithubService);
  private readonly GITHUB_USERNAME = '224rifche';

  // Filtres disponibles
  readonly filters = ['Tous', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];
  readonly activeFilter = signal('Tous');

  projects = signal<Project[]>([]);
  loading = signal(true);
  error = signal('');

  // Projets à mettre en avant
  private readonly FEATURED_PROJECTS = [
    'mon-portfolio',
    'gestion-flotte',
    'sofamer-app'
  ];

  // Couleurs personnalisées pour les langages
  private readonly LANGUAGE_COLORS: { [key: string]: string } = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Angular': '#dd1b16',
    'Node.js': '#68a063',
    'React': '#61dafb',
    'Vue': '#41b883'
  };

  // Projets filtrés
  get filteredProjects(): Project[] {
    const activeFilter = this.activeFilter();
    const projects = this.projects();
    
    return projects.filter(project => 
      activeFilter === 'Tous' || 
      project.language === activeFilter ||
      project.topics?.includes(activeFilter.toLowerCase())
    );
  }

  async ngOnInit() {
    await this.loadProjects();
  }

  async loadProjects() {
    try {
      this.loading.set(true);
      this.error.set('');
      
      const repos = await firstValueFrom(this.githubService.getRepos(this.GITHUB_USERNAME));
      
      if (Array.isArray(repos)) {
        const projects = repos.map((repo: any) => ({
          id: repo.id,
          name: this.formatProjectName(repo.name),
          description: repo.description || 'Aucune description disponible',
          html_url: repo.html_url,
          homepage: repo.homepage || '',
          language: repo.language || 'Autre',
          topics: repo.topics || [],
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          featured: this.FEATURED_PROJECTS.includes(repo.name)
        }));

        this.projects.set(projects);
      } else {
        throw new Error('Les données reçues ne sont pas valides');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
      this.error.set(err instanceof Error ? err.message : 'Impossible de charger les projets depuis GitHub. Veuillez vérifier votre connexion ou réessayer plus tard.');
    } finally {
      this.loading.set(false);
    }
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  getLanguageColor(language: string): string {
    return this.LANGUAGE_COLORS[language] || '#6b7280';
  }

  private formatProjectName(name: string): string {
    if (!name) return '';
    // Convertir les tirets en espaces et mettre en majuscule la première lettre de chaque mot
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getLastUpdated(dateString: string): string {
    return this.getFormattedDate(dateString, 'Mis à jour le');
  }

  getFormattedDate(dateString: string, prefix: string = ''): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return prefix ? `${prefix} ${formattedDate}` : formattedDate;
  }
}