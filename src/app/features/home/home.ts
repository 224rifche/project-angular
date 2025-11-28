import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  // Méthode pour suivre les éléments dans les boucles *ngFor
  trackByIndex(index: number): number {
    return index;
  }
  hero = {
    greeting: "Bonjour, moi c'est",
    name: 'Boubacar Cherif Diallo',
    title: 'Développeur Full-Stack de formation',
    description:
      "J'aide les entreprises et les startups à concevoir des expériences numériques performantes en combinant design soigné, code maintenable et sens du détail.",
    primaryCta: {
      label: 'Télécharger mon CV',
      href: '/assets/cv.pdf',
    },
    secondaryCta: {
      label: 'Voir mes projets',
      link: '/projects',
    },
  };

  availability = {
    headline: 'Disponibilité',
    message: 'À la recherche d’une opportunité Angular dès janvier 2026',
    status: 'Actuellement disponible',
  };

  stats = [
    { value: '+3', label: "années d'expérience" },
    { value: '+12', label: 'projets livrés' },
    { value: '4', label: 'technos maîtrisées' },
  ];

  highlights = [
    {
      title: 'Ce que je fais',
      items: [
        'Applications web responsives avec Angular & Tailwind',
        'APIs Node.js/NestJS scalables',
        'Design system et intégrations pixel-perfect',
      ],
    },
    {
      title: 'Valeur ajoutée',
      items: [
        'Approche orientée UX et performance',
        'Culture DevOps (Git, Docker, CI/CD)',
        'Communication claire avec les équipes',
      ],
    },
  ];
}
