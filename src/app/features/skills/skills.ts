import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  title: string;
  description: string;
  skills: { label: string; level: number }[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  readonly categories: SkillCategory[] = [
    {
      title: 'Frontend',
      description: 'Création d’interfaces dynamiques et responsives avec des design systems robustes.',
      skills: [
        { label: 'Angular / RxJS', level: 90 },
        { label: 'Typescript / ES2023', level: 88 },
        { label: 'TailwindCSS / SCSS', level: 80 },
        { label: 'Testing (Jest, Cypress)', level: 75 },
      ],
    },
    {
      title: 'Backend',
      description: 'API REST & GraphQL sécurisées, tests et industrialisation.',
      skills: [
        { label: 'Node.js / NestJS', level: 85 },
        { label: 'Express / Fastify', level: 78 },
        { label: 'MongoDB / PostgreSQL', level: 70 },
        { label: 'Prisma / TypeORM', level: 72 },
      ],
    },
    {
      title: 'Opérations & Collaboration',
      description: 'Culture DevOps, outillage et accompagnement des équipes.',
      skills: [
        { label: 'Git / GitHub Actions', level: 82 },
        { label: 'Docker / Compose', level: 74 },
        { label: 'CI/CD Azure DevOps', level: 70 },
        { label: 'Mentorat & formation', level: 88 },
      ],
    },
  ];
}
