import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2c3e50, #3498db);
      color: white;
      padding: 3rem 2rem 1.5rem;
      position: relative;
      overflow: hidden;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .footer-section {
      margin-bottom: 1.5rem;
    }

    .footer h3 {
      color: #fff;
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
      position: relative;
      padding-bottom: 0.5rem;
    }

    .footer h3::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background-color: #3498db;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 0.8rem;
    }

    .footer-links a {
      color: #ecf0f1;
      text-decoration: none;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .footer-links a:hover {
      color: #3498db;
      transform: translateX(5px);
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: white;
      transition: all 0.3s ease;
      font-size: 1.2rem;
      position: relative;
      overflow: hidden;
    }

    .social-links a:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    /* Couleurs spécifiques pour chaque réseau social */
    .social-links a[title="GitHub"]:hover { background: #333; }
    .social-links a[title="LinkedIn"]:hover { background: #0077b5; }
    .social-links a[title="WhatsApp"]:hover { background: #25D366; }
    .social-links a[title="Facebook"]:hover { background: #4267B2; }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      margin-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-bottom p {
      margin: 0;
      font-size: 0.9rem;
      color: #bdc3c7;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .footer h3::after {
        left: 50%;
        transform: translateX(-50%);
      }

      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/224rifche', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/boubacar-cherif-diallo', label: 'LinkedIn' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/224611541829', label: 'WhatsApp' },
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/224rifche', label: 'Facebook' }
  ];

  quickLinks = [
    { icon: 'fas fa-chevron-right', label: 'Accueil', route: '/' },
    { icon: 'fas fa-chevron-right', label: 'À propos', route: '/about' },
    { icon: 'fas fa-chevron-right', label: 'Projets', route: '/projects' },
    { icon: 'fas fa-chevron-right', label: 'Compétences', route: '/skills' },
    { icon: 'fas fa-chevron-right', label: 'Contact', route: '/contact' }
  ];

  contactInfo = [
    { icon: 'fas fa-phone', text: '+224 611 54 18 29' },
    { icon: 'fab fa-whatsapp', text: 'WhatsApp: +224 611 54 18 29' },
    { icon: 'fas fa-map-marker-alt', text: 'Conakry, Guinée' }
  ];
}
