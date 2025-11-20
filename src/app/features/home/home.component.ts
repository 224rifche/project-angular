import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">Bienvenue sur mon portfolio</h1>
          <h2 class="subtitle is-3">Développeur passionné par les technologies web</h2>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #6e8efb, #a777e3);
      color: white;
    }
  `]
})
export class HomeComponent {}
