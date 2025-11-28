import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillIconPipe } from '../../shared/pipes/skill-icon.pipe';

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon?: string;
}

interface HighlightItem {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SkillIconPipe],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About {
  readonly intro = {
    title: 'Développeur Full Stack & Expert en Solutions Numériques',
    description: "Je suis BOUBACAR CHERIF DIALLO, passionné par l'innovation technologique et le développement d'applications web et mobiles. Fort de 4 ans d'expérience, je me spécialise dans la création de solutions numériques performantes et évolutives. Mon approche allie rigueur technique et créativité pour répondre aux besoins spécifiques de chaque projet.",
    quote: '"Transformer des idées en solutions numériques innovantes est ce qui me passionne au quotidien."',
  };

  readonly highlights: HighlightItem[] = [
    { label: 'Années d’expérience', value: '4+', icon: 'fa-briefcase' },
    { label: 'Projets réalisés', value: '8+', icon: 'fa-code' },
    { label: 'Langages maîtrisés', value: '6+', icon: 'fa-laptop-code' },
  ];

  readonly skillCategories = [
    {
      name: 'Frontend',
      skills: ['Angular', 'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'TailwindCSS']
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Express', 'NestJS', 'Django', 'Laravel', 'PHP']
    },
    {
      name: 'Bases de données',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL']
    },
    {
      name: 'Outils & Autres',
      skills: ['Git', 'GitHub', 'Docker', 'UML', 'Java', 'Python', 'C/C++']
    }
  ];

  // Méthode pour suivre les éléments dans les boucles *ngFor
  trackByIndex(index: number): number {
    return index;
  }

  trackBySkill(index: number, skill: string): string {
    return skill;
  }


  readonly journey: ExperienceItem[] = [
    {
      year: '2022 - Maintenant',
      title: 'Étudiant en Génie Logiciel',
      company: 'Université',
      description: "Formation approfondie en développement logiciel, algorithmique et gestion de projet. Spécialisation en développement web et mobile.",
      icon: 'fa-graduation-cap'
    },
    {
      year: '2021 - 2022',
      title: 'Projet Académique - Application Web',
      company: 'Projet Scolaire',
      description: "Développement d'une application web complète avec Angular et Node.js, implémentation d'API REST et gestion de base de données.",
      icon: 'fa-laptop-code'
    },
    {
      year: '2020 - 2021',
      title: 'Découverte du Développement',
      company: 'Auto-formation',
      description: "Apprentissage des bases de la programmation et réalisation des premiers projets personnels en HTML/CSS, JavaScript et Python.",
      icon: 'fa-code'
    }
  ];
}
