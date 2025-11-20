import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  stack: string[];
  category: string;
  caseStudyUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly filters = ['Tous les projets', 'Angular', 'React', 'Django', 'Laravel', 'TypeScript', 'JavaScript'];
  readonly activeFilter = signal('Tous les projets');

  readonly projects: Project[] = [
    {
      title: 'Système de Gestion de Flotte',
      description: "Application de gestion de flotte de transport durant le stage chez AltGras.",
      stack: ['Angular', 'TypeScript', 'Django REST', 'TailwindCSS'],
      category: 'Angular',
    },
    {
      title: 'SOFAMER - Gestion de production',
      description: 'Suivi de la fabrication multi-emballage et recyclage.',
      stack: ['Angular', 'TypeScript', 'Bootstrap', 'Angular Material'],
      category: 'Angular',
    },
    {
      title: 'CIGO - Gestion de chantiers',
      description: "Piloter les grands chantiers d’une entreprise de construction.",
      stack: ['Laravel', 'Livewire', 'TailwindCSS'],
      category: 'Laravel',
    },
    {
      title: 'KALSADORT - Gestion de transport',
      description: 'Système pour société de transport moderne.',
      stack: ['Laravel', 'Livewire', 'TailwindCSS'],
      category: 'Laravel',
    },
    {
      title: 'AREKA - Vente & Transport',
      description: 'Plateforme de gestion de la vente d’huile et du transport.',
      stack: ['Laravel', 'Livewire', 'TailwindCSS'],
      category: 'Laravel',
    },
    {
      title: 'Gestion de Restaurant',
      description: 'Commandes, réservations et reporting pour restaurants.',
      stack: ['Django', 'TailwindCSS'],
      category: 'Django',
    },
    {
      title: 'Gestion École',
      description: 'Administration complète et suivi des étudiants.',
      stack: ['React', 'TypeScript', 'Laravel'],
      category: 'React',
    },
    {
      title: 'GKI - Gestion interne',
      description: 'Outil interne pour le groupe Kallan International.',
      stack: ['Laravel', 'Livewire', 'TailwindCSS'],
      category: 'Laravel',
    },
  ];

  get filteredProjects(): Project[] {
    const filter = this.activeFilter();
    if (filter === 'Tous les projets') {
      return this.projects;
    }
    return this.projects.filter(project =>
      project.category.toLowerCase() === filter.toLowerCase() ||
      project.stack.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
    );
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}
