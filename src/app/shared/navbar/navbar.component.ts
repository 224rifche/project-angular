import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <span class="has-text-weight-bold">MonPortfolio</span>
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" 
             (click)="toggleMenu()" [class.is-active]="isMenuOpen">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" [class.is-active]="isMenuOpen">
          <div class="navbar-end">
            <a class="navbar-item" routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{exact: true}">
              Accueil
            </a>
            <a class="navbar-item" routerLink="/about" routerLinkActive="is-active">
              À propos
            </a>
            <a class="navbar-item" routerLink="/skills" routerLinkActive="is-active">
              Compétences
            </a>
            <a class="navbar-item" routerLink="/projects" routerLinkActive="is-active">
              Projets
            </a>
            <a class="navbar-item" routerLink="/contact" routerLinkActive="is-active">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
    }
    .navbar-item {
      font-weight: 500;
      transition: color 0.3s;
    }
    .navbar-item:hover {
      color: #3273dc !important;
      background-color: transparent !important;
    }
    .is-active {
      color: #3273dc !important;
      font-weight: bold !important;
    }
    .navbar-burger {
      height: auto;
    }
  `]
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Fermer le menu lors de la navigation sur mobile
    this.router.events.subscribe(() => {
      this.isMenuOpen = false;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
