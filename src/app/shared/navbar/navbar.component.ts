import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #6e8efb, #a777e3);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      flex-wrap: nowrap;
    }

    .brand {
      font-size: 1.25rem;
      font-weight: 700;
      color: #FFFFFF;
      text-decoration: none;
      transition: all 0.3s ease;
      white-space: nowrap;
      margin-right: 1rem;
    }

    .brand:hover {
      color: #ffffff;
      opacity: 1;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #000000;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .logo:hover {
      color: #ffffff;
      opacity: 1;
    }

    /* Conteneur des liens de navigation */
    .nav-links {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.5rem; /* Réduit l'espacement entre les liens */
      list-style: none;
      margin: 0;
      padding: 0 1rem; /* Ajoute un padding pour éviter que les liens ne touchent les bords */
      transition: all 0.3s ease-in-out;
      flex-wrap: nowrap;
      flex: 1;
      margin-left: 1rem;
      overflow-x: auto; /* Permet le défilement horizontal si nécessaire */
      white-space: nowrap; /* Empêche le retour à la ligne des liens */
    }

    /* Style des liens */
    .nav-links a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white; /* Changé de noir à blanc pour une meilleure visibilité */
      font-weight: 600;
      font-size: 0.9rem; /* Taille de police réduite pour plus de place */
      padding: 0.5rem 0.8rem; /* Padding réduit */
      border-radius: 6px;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px; /* Espacement des lettres réduit */
      white-space: nowrap; /* Empêche le texte de passer à la ligne */
    }

    /* Style des icônes */
    .nav-links a i {
      font-size: 1.2rem;
      width: 1.5rem;
      text-align: center;
    }

    /* Hover effect */
    .nav-links a:hover {
      color: #000000;
      background-color: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Active link style */
    .nav-links a.router-link-active {
      color: #000000;
      background-color: rgba(255, 255, 255, 0.95);
      font-weight: 700;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Bouton du menu mobile */
    .menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      z-index: 1000;
      margin-left: auto;
    }
    
    .menu-icon {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 28px;
      height: 20px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .menu-icon span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: #fff;
      transition: all 0.3s ease;
    }
    
    .menu-btn.active .menu-icon span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .menu-btn.active .menu-icon span:nth-child(2) {
      opacity: 0;
    }
    
    .menu-btn.active .menu-icon span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    /* Styles pour mobile */
    @media (max-width: 1200px) {
      .menu-btn {
        display: block;
      }
      
      .nav-links {
        display: none;
      }
      
      .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        padding: 1rem 0;
        gap: 1rem;
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem 0;
        transform: translateY(-150%);
        opacity: 0;
        z-index: 999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
      }
      
      .nav-links a {
        width: 80%;
        text-align: center;
        padding: 0.8rem 0;
      }
      
      .nav-links a:hover {
        background-color: rgba(255, 255, 255, 0.85);
      }
      
      .nav-links a::after {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Ferme le menu quand on clique en dehors
  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar') && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // Ferme le menu lors du redimensionnement de la fenêtre
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}
