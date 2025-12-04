import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.experience-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Experience implements OnInit {
  activeTab: string = 'all';
  
  readonly experiences: ExperienceItem[] = [
    {
      period: '2023 — Aujourd\'hui',
      title: 'Développeur Full-Stack',
      company: 'Projets Personnels',
      description: 'Réalisation de projets complets avec différentes technologies modernes et conception d\'API robustes.',
      tags: ['Angular', 'Node.js', 'Django', 'TailwindCSS', 'API REST'],
      icon: '💻',
      badge: 'Actuel'
    },
    {
      period: '2024 - 2025',
      title: 'Ambassadeur',
      company: '10000 Codeurs',
      description: 'Promotion de l\'apprentissage du code et mentorat des nouveaux développeurs.',
      tags: ['Mentorat', 'Formation', 'Développement Web'],
      icon: '🌟',
      badge: 'Futur'
    },
    {
      period: '2024',
      title: 'Animateur Bénévole',
      company: 'Centre numérique Orange',
      description: 'Initiation des jeunes à la programmation et organisation d\'ateliers créatifs.',
      tags: ['Scratch', 'Animation', 'Bénévolat'],
      icon: '🎨'
    },
    {
      period: '2022 - 2025',
      title: 'Étudiant en informatique',
      company: 'Formation académique',
      description: 'Apprentissage approfondi des concepts fondamentaux en informatique et développement logiciel.',
      tags: ['Algorithmique', 'Structures de données', 'Programmation'],
      icon: '🎓',
      badge: 'En cours'
    }
  ];

  filteredExperiences: ExperienceItem[] = [];

  ngOnInit() {
    this.filteredExperiences = [...this.experiences];
  }

  filterExperiences(category: string) {
    this.activeTab = category;
    if (category === 'all') {
      this.filteredExperiences = [...this.experiences];
    } else {
      this.filteredExperiences = this.experiences.filter(exp => 
        exp.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
      );
    }
  }

  getUniqueTags(): string[] {
    const allTags = this.experiences.flatMap(exp => exp.tags);
    return [...new Set(allTags)];
  }
}
