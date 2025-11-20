import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface HighlightItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly intro = {
    title: 'Développeur Full Stack & Formateur Passionné',
    description:
      "Je conçois des applications web modernes en conciliant exigences métier, performance et expérience utilisateur. J'accompagne également des étudiants et des équipes sur les bonnes pratiques Angular, Node.js et DevOps.",
    quote: '“Coder, c’est résoudre des problèmes humains avec des solutions élégantes.”',
  };

  readonly highlights: HighlightItem[] = [
    { label: 'Années d’expérience', value: '5+' },
    { label: 'Projets livrés', value: '24' },
    { label: 'Étudiants accompagnés', value: '80+' },
  ];

  readonly skills = [
    'Angular / NgRx',
    'Node.js & NestJS',
    'Design Systems & UI Kits',
    'CI/CD & Docker',
    'Tests unitaires & e2e',
    'Pedagogie & mentoring',
  ];

  readonly journey: ExperienceItem[] = [
    {
      year: '2024 - Aujourd’hui',
      title: 'Lead Developer & Formateur Angular',
      company: 'Bootcamp NextGen',
      description:
        'Encadrement de promotions, conception de modules avancés et accompagnement sur des projets réels en entreprise.',
    },
    {
      year: '2022 - 2024',
      title: 'Ingénieur Full Stack',
      company: 'TechLabs',
      description:
        'Création d’applications SaaS (Angular/NestJS), intégration API third-party et mise en place de pipelines CI/CD.',
    },
    {
      year: '2020 - 2022',
      title: 'Développeur Frontend',
      company: 'Creative Factory',
      description:
        'Intégration de design systems, animations micro‑interactions et optimisation Lighthouse > 90.',
    },
  ];
}
