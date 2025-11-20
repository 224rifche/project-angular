import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  codeUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h1 class="title">Mes Projets</h1>
        <div class="projects-grid">
          <div *ngFor="let project of projects" class="project-card">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">{{ project.title }}</p>
                <p class="subtitle is-6">{{ project.description }}</p>
                <div class="tags">
                  <span *ngFor="let tech of project.technologies" class="tag is-primary">
                    {{ tech }}
                  </span>
                </div>
              </div>
              <footer class="card-footer">
                <a *ngIf="project.demoUrl" [href]="project.demoUrl" class="card-footer-item">Démo</a>
                <a *ngIf="project.codeUrl" [href]="project.codeUrl" class="card-footer-item">Code</a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .project-card {
      transition: transform 0.3s ease;
    }
    .project-card:hover {
      transform: translateY(-5px);
    }
    .card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .card-content {
      flex-grow: 1;
    }
    .tags {
      margin-top: 1rem;
    }
  `]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Application Web E-commerce',
      description: 'Une plateforme complète de vente en ligne avec panier et paiement.',
      technologies: ['Angular', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Réseau Social',
      description: 'Un réseau social avec partage de publications et messagerie en temps réel.',
      technologies: ['React', 'Firebase', 'Redux'],
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Application Météo',
      description: 'Application de prévisions météorologiques avec géolocalisation.',
      technologies: ['Vue.js', 'OpenWeather API'],
      demoUrl: '#',
      codeUrl: '#'
    }
  ];
}
