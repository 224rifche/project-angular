import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h1 class="title">À propos de moi</h1>
        <div class="content">
          <p>
            Passionné par le développement web et les nouvelles technologies, je mets mes compétences 
            au service de projets innovants et créatifs.
          </p>
          <p>
            Mon parcours et mes expériences m'ont permis de développer une solide expertise dans 
            le développement d'applications web modernes et réactives.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      padding: 3rem 1.5rem;
    }
  `]
})
export class AboutComponent {}
