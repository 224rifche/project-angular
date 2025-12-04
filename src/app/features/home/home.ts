import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  // Méthode pour télécharger le CV
  downloadCV() {
    // Chemin vers le CV dans le dossier assets
    const cvUrl = 'assets/documents/cv.pdf';
    
    // Créer un élément <a> invisible pour le téléchargement
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Boubacar_Cherif_Diallo.pdf';
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // Données pour la section hero
  hero = {
    greeting: "Bonjour, je suis",
    name: "Boubacar Chérif Diallo",
    title: "Développeur Full-Stack Passionné",
    description: "Je crée des expériences web modernes et performantes avec les dernières technologies du développement. Spécialisé dans la conception d'applications web réactives et évolutives, je mets mon expertise à votre service pour concrétiser vos projets numériques.",
    primaryCta: {
      label: 'Me contacter',
      link: '/contact',
    },
    secondaryCta: {
      label: 'Voir mes projets',
      link: '/projects',
    },
  };

  // Données pour les services
  services: Service[] = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Développement Web',
      description: 'Création de sites web et applications web modernes, réactifs et performants.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Applications Mobiles',
      description: 'Développement d\'applications mobiles cross-plateformes avec les dernières technologies.'
    },
    {
      icon: 'fas fa-server',
      title: 'Backend & API',
      description: 'Conception et développement d\'API robustes et sécurisées pour alimenter vos applications.'
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'UI/UX Design',
      description: 'Conception d\'interfaces utilisateur intuitives et d\'expériences utilisateur mémorables.'
    },
    {
      icon: 'fas fa-search',
      title: 'SEO',
      description: 'Optimisation pour les moteurs de recherche pour améliorer votre visibilité en ligne.'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Performance',
      description: 'Optimisation des performances pour des temps de chargement ultra-rapides.'
    }
  ];

  // Méthode utilitaire pour le suivi des éléments dans les boucles *ngFor
  trackByIndex(index: number): number {
    return index;
  }
}
