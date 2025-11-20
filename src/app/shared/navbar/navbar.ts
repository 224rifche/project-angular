import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isMenuOpen = false;

  navLinks: NavLink[] = [
    { label: 'Accueil', path: '/', exact: true },
    { label: 'À propos', path: '/about' },
    { label: 'Compétences', path: '/skills' },
    { label: 'Expérience', path: '/experience' },
    { label: 'Projets', path: '/projects' },
    { label: 'Github', path: '/github-stats' },
  ];

  socialLinks = [
    { label: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/boubacar' },
    { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/boubacar' },
    { label: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com/boubacar' },
    { label: 'WhatsApp', icon: 'fab fa-whatsapp', url: 'https://wa.me/0000000000' },
  ];

  footerNote = '© ' + new Date().getFullYear() + ' Boubacar Diallo — Portfolio';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isMenuOpen = false;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
