import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  location: string;
  bullets: string[];
  badge?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  readonly roles: ExperienceItem[] = [
    {
      period: 'Juin 2024 - Aujourd’hui',
      title: 'Développeur Web',
      company: 'GKI (Groupe Kallan International S.A)',
      location: 'Lambanyi, Guinée',
      bullets: [
        'Création et maintenance d’applications web',
        'Développement frontend et backend sur des projets critiques',
      ],
      badge: 'Actuel',
    },
    {
      period: 'Oct 2024 - Juin 2025',
      title: 'Formateur en Développement Web',
      company: 'Université Barack Obama',
      location: 'Conakry, Guinée',
      bullets: [
        'Formation des étudiants en Licence professionnelle',
        'Cours sur Angular, Django et pratiques modernes',
      ],
    },
    {
      period: 'Nov 2023',
      title: 'Formation en Développement Personnel',
      company: 'Conakry, Guinée',
      location: 'Conakry, Guinée',
      bullets: [
        'Développement des soft skills pour maximiser l’impact professionnel',
      ],
    },
    {
      period: 'Juin 2023 - Août 2023',
      title: 'Stagiaire Développeur',
      company: 'AltGras',
      location: 'Conakry, Guinée',
      bullets: [
        'Participation à un projet de gestion de flotte de transport',
        'Contribution aux phases de conception et d’implémentation',
      ],
    },
    {
      period: '2021 - 2024',
      title: 'Enseignant en Informatique',
      company: 'Conakry, Guinée',
      location: 'Conakry, Guinée',
      bullets: [
        'Animation de cours Algorithme, Java, C/C++, HTML/CSS, JavaScript',
        'Encadrement de projets étudiants et production de cours en ligne',
      ],
    },
  ];

  readonly highlights = [
    { label: 'Projets livrés', value: '35+' },
    { label: 'Étudiants formés', value: '120+' },
    { label: 'Années d’expérience', value: '5' },
  ];
}
