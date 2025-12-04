import { Component, OnDestroy, Renderer2, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">Boubacar Cherif Diallo</a>
        
        <div class="nav-links" [class.active]="isMenuOpen">
          <a routerLink="/" 
             routerLinkActive="active" 
             [routerLinkActiveOptions]="{exact: true}"
             (click)="closeMenu()">
            Accueil
          </a>
          <a routerLink="/about" 
             routerLinkActive="active"
             (click)="closeMenu()">
            À propos
          </a>
          <a routerLink="/projects" 
             routerLinkActive="active"
             (click)="closeMenu()">
            Projets
          </a>
          <a routerLink="/experience" 
             routerLinkActive="active"
             (click)="closeMenu()">
            Expérience
          </a>
          <a routerLink="/contact" 
             routerLinkActive="active"
             (click)="closeMenu()">
            Contact
          </a>

           <a routerLink="/github-stats" 
             routerLinkActive="active"
             (click)="closeMenu()">
            Github-stats
          </a>
         
        </div>

        <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen" aria-label="Menu">
          <span class="hamburger"></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #1a1a2e;
      padding: 1rem 0;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    .github-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #333;
      padding: 0.5rem 1rem !important;
      border-radius: 4px;
    }

    .github-link:hover {
      background: #444;
    }

    .github-stats {
      display: flex;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #fff;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    }

    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: white;
      position: relative;
    }

    .hamburger::before,
    .hamburger::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: white;
      left: 0;
      transition: all 0.3s ease;
    }

    .hamburger::before {
      top: -8px;
    }

    .hamburger::after {
      bottom: -8px;
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }

      .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #1a1a2e;
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }

      .nav-links.active {
        display: flex;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  isMenuOpen = false;
  currentRoute = '';
  
  private scrollListener: (() => void) | null = null;
  private resizeListener: (() => void) | null = null;
  private routerEventsSubscription: any;

  private lastScrollTop = 0;
  private ticking = false;
  private navElement: HTMLElement;

  githubStats: any = null;
  loading = false;

  constructor(
    public router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private githubService: GithubService
  ) {
    this.navElement = this.el.nativeElement.querySelector('.navbar');
    
    // S'abonner aux changements de route
    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects || event.url;
      this.closeMenu();
      this.cdr.markForCheck();
    });
  }

  ngOnInit() {
    this.loadGithubStats();
  }

  loadGithubStats() {
    if (typeof window === 'undefined') return; // Ne pas exécuter côté serveur
    this.loading = true;
    this.githubService.getRepoStats('224rifche', 'project-angular').subscribe({
      next: (data) => {
        if (data) {
          this.githubStats = data;
        } else {
          this.githubStats = { stars: 0, forks: 0, watchers: 0 };
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des stats GitHub:', err);
        this.loading = false;
        this.githubStats = { stars: 0, forks: 0, watchers: 0 };
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.initializeEventListeners();
    }
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    // Se désabonner des événements du routeur
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  private initializeEventListeners(): void {
    // Utilisation de NgZone.runOutsideAngular pour les événements de performance critique
    this.ngZone.runOutsideAngular(() => {
      // Utilisation de requestAnimationFrame pour une meilleure performance
      const handleScroll = () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.onScroll();
            this.ticking = false;
          });
          this.ticking = true;
        }
      };

      this.scrollListener = this.renderer.listen('window', 'scroll', handleScroll, { passive: true });
      this.resizeListener = this.renderer.listen('window', 'resize', () => this.onResize());
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (typeof document !== 'undefined') {
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  private onResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth > 992) {
      this.closeMenu();
    }
    
    // Détection du mode de réduction de mouvement pour les préférences d'accessibilité
    if (typeof window !== 'undefined') {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        if (typeof document !== 'undefined') {
          this.renderer.addClass(document.body, 'reduced-motion');
        }
      } else if (typeof document !== 'undefined') {
        this.renderer.removeClass(document.body, 'reduced-motion');
      }
    }
  }

  private onScroll(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return; // Ne rien faire côté serveur
    }
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajout/suppression de la classe 'scrolled' avec une logique de seuil
    if (scrollTop > 10) {
      this.renderer.addClass(this.navElement, 'scrolled');
      
      // Animation de masquage/affichage au défilement
      if (scrollTop > this.lastScrollTop && scrollTop > 100) {
        this.renderer.addClass(this.navElement, 'nav-up');
      } else {
        this.renderer.removeClass(this.navElement, 'nav-up');
      }
    } else {
      this.renderer.removeClass(this.navElement, 'scrolled');
      this.renderer.removeClass(this.navElement, 'nav-up');
    }
    
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Pour le défilement vers le haut
  }

  // Méthode optimisée pour vérifier si une route est active
  isActive(route: string): boolean {
    // Pour la page d'accueil, vérifier le chemin exact
    if (route === '/') {
      return this.router.url === '/';
    }
    // Pour les autres routes, vérifier si l'URL commence par la route
    return this.router.url.startsWith(route);
  }
  
  // Fermer le menu lors d'un clic sur un lien
  onNavLinkClick(): void {
    this.closeMenu();
    // Forcer la détection des changements
    this.cdr.detectChanges();
  }

  // Optimisation: Détection de changement manuelle pour les mises à jour nécessaires
  private markForCheck(): void {
    this.cdr.markForCheck();
  }

  private removeEventListeners(): void {
    // Nettoyer les écouteurs d'événements
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
    if (this.resizeListener) {
      this.resizeListener();
      this.resizeListener = null;
    }
  }
}