import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

interface Skill {
  label: string;
  level: number;
  icon: string;
  color: string;
}

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Skills {
  activeCategory: string = 'all';
  
  categories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Développement Frontend',
      description: 'Création d\'interfaces dynamiques et responsives avec des design systems robustes.',
      icon: 'fa-laptop-code',
      skills: [
        { label: 'Angular / RxJS', level: 90, icon: 'fa-angular', color: '#DD0031' },
        { label: 'TypeScript / ES2023', level: 88, icon: 'fa-js', color: '#3178C6' },
        { label: 'React / JavaScript', level: 85, icon: 'fa-react', color: '#61DAFB' },
        { label: 'TailwindCSS / SCSS', level: 80, icon: 'fa-css3-alt', color: '#38B2AC' },
        { label: 'Testing (Jest, Cypress)', level: 75, icon: 'fa-vial', color: '#15C213' },
      ]
    },
    {
      id: 'backend',
      title: 'Développement Backend',
      description: 'API REST & GraphQL sécurisées, tests et industrialisation.',
      icon: 'fa-server',
      skills: [
        { label: 'Node.js / NestJS', level: 85, icon: 'fa-node-js', color: '#68A063' },
        { label: 'Django / Python', level: 78, icon: 'fa-python', color: '#3776AB' },
        { label: 'PHP / Laravel', level: 72, icon: 'fa-laravel', color: '#FF2D20' },
        { label: 'Java / SpringBoot', level: 72, icon: 'fa-java', color: '#007396' },
        { label: 'C# / .NET', level: 72, icon: 'fa-windows', color: '#512BD4' },
        { label: 'MySQL / PostgreSQL', level: 70, icon: 'fa-database', color: '#336791' },
      ]
    },
    {
      id: 'devops',
      title: 'Outils & DevOps',
      description: 'Culture DevOps, outillage et bonnes pratiques de développement.',
      icon: 'fa-code-branch',
      skills: [
        { label: 'Git / GitHub', level: 88, icon: 'fa-git-alt', color: '#F05032' },
        { label: 'Docker / Compose', level: 74, icon: 'fa-docker', color: '#2496ED' },
        { label: 'CI/CD Azure DevOps', level: 70, icon: 'fa-microsoft', color: '#0078D7' },
        { label: 'Linux / Bash', level: 75, icon: 'fa-linux', color: '#FCC624' },
        { label: 'VS Code', level: 90, icon: 'fa-code', color: '#007ACC' },
      ]
    }
  ];

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
  }

  getFilteredSkills() {
    if (this.activeCategory === 'all') {
      return this.categories;
    }
    return this.categories.filter(cat => cat.id === this.activeCategory);
  }

  getProgressAnimation(level: number) {
    return {
      'width': '0%',
      'animation': `progress-animation 1s ease-out forwards`,
      'animation-delay': '0.3s',
      '--progress-level': `${level}%`
    };
  }
}
