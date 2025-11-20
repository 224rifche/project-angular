import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h1 class="title">Mes Compétences</h1>
        <div class="skills-container">
          <div *ngFor="let skill of skills" class="skill-category">
            <h3 class="subtitle">{{ skill.category }}</h3>
            <div class="skills-list">
              <div *ngFor="let item of skill.items" class="skill-item">
                <span class="skill-name">{{ item.name }}</span>
                <progress class="progress is-primary" [value]="item.level" max="100">
                  {{ item.level }}%
                </progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-container {
      display: grid;
      gap: 2rem;
      margin-top: 2rem;
    }
    .skill-category {
      margin-bottom: 1.5rem;
    }
    .skill-item {
      margin-bottom: 1rem;
    }
    .skill-name {
      display: block;
      margin-bottom: 0.5rem;
    }
  `]
})
export class SkillsComponent {
  skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript/TypeScript', level: 85 },
        { name: 'Angular', level: 80 },
        { name: 'React', level: 75 }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'Java', level: 70 }
      ]
    },
    {
      category: 'Outils',
      items: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'CI/CD', level: 65 }
      ]
    }
  ];
}
