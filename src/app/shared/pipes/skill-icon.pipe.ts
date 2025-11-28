import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillIcon',
  standalone: true
})
export class SkillIconPipe implements PipeTransform {
  private readonly skillIcons: { [key: string]: string } = {
    'angular': 'fab fa-angular',
    'node': 'fab fa-node-js',
    'typescript': 'fas fa-code',
    'javascript': 'fab fa-js',
    'python': 'fab fa-python',
    'java': 'fab fa-java',
    'php': 'fab fa-php',
    'html': 'fab fa-html5',
    'css': 'fab fa-css3-alt',
    'django': 'fab fa-python',
    'laravel': 'fab fa-laravel',
    'docker': 'fab fa-docker',
    'mongodb': 'fas fa-database',
    'postgresql': 'fas fa-database',
    'mysql': 'fas fa-database',
    'sql': 'fas fa-database',
    'git': 'fab fa-git-alt',
    'github': 'fab fa-github',
    'uml': 'fas fa-project-diagram',
    'c++': 'fas fa-code',
    'c': 'fas fa-code',
    'tailwind': 'fas fa-paint-brush'
  };

  transform(skill: string): string {
    if (!skill) return 'fas fa-code';
    
    const lowerSkill = skill.toLowerCase();
    
    // Vérifie d'abord les correspondances exactes
    for (const [key, icon] of Object.entries(this.skillIcons)) {
      if (lowerSkill === key.toLowerCase()) {
        return icon;
      }
    }
    
    // Ensuite, vérifie les correspondances partielles
    for (const [key, icon] of Object.entries(this.skillIcons)) {
      if (lowerSkill.includes(key.toLowerCase())) {
        return icon;
      }
    }
    
    // Retourne une icône par défaut si aucune correspondance n'est trouvée
    return 'fas fa-code';
  }
}
