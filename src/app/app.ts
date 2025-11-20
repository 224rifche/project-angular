import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mon-portfolio');

  readonly footerNav = [
    { label: 'Accueil', path: '/' },
    { label: 'À propos', path: '/about' },
    { label: 'Compétences', path: '/skills' },
    { label: 'Expérience', path: '/experience' },
    { label: 'Projets', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  readonly footerHero = {
    name: 'Boubacar Cherif Diallo',
    title: 'Développeur Full Stack en Formation',
    copyright: '© 2025 Boubacar Cherif Diallo. Tous droits réservés.'
  };
}
