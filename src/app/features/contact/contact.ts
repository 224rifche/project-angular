import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

interface ContactDetail {
  icon: string;
  label: string;
  value: string;
  link: string;
  text?: string;
}

interface ContactStat {
  label: string;
  value: string;
  note: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  readonly details: ContactDetail[] = [
    { 
      icon: 'fa-envelope', 
      label: 'Email', 
      value: 'cherif21975@gmail.com',
      link: 'mailto:cherif21975@gmail.com'
    },
    { 
      icon: 'fa-phone', 
      label: 'Téléphone', 
      value: '+224 611 54 18 29',
      link: 'tel:+224611541829'
    },
    { 
      icon: 'fa-whatsapp', 
      label: 'WhatsApp', 
      value: 'Me contacter',
      link: 'https://wa.me/224611541829'
    },
    { 
      icon: 'fa-map-marker-alt', 
      label: 'Localisation', 
      value: 'Conakry, Guinée',
      link: 'https://maps.google.com?q=Conakry,Guinée'
    },
  ];

  readonly languages = ['Français (Langue maternelle)', 'Anglais (Intermédiaire)'];
  
  // Animation states
  isHovered = signal<number | null>(null);
  isSubmitted = signal(false);

  // Suppression des statistiques

  readonly socialLinks = [
    { 
      icon: 'fab fa-linkedin-in', 
      label: 'LinkedIn', 
      url: 'https://linkedin.com/in/boubacar-cherif-diallo',
      color: '#0077b5',
      text: 'Boubacar Cherif Diallo'
    },
    { 
      icon: 'fab fa-github', 
      label: 'GitHub', 
      url: 'https://github.com/224rifche',
      color: '#333',
      text: '224rifche'
    },
    { 
      icon: 'fab fa-facebook-f', 
      label: 'Facebook', 
      url: 'https://facebook.com/224rifche',
      color: '#4267B2',
      text: 'Boubacar Cherif Diallo'
    },
    { 
      icon: 'fab fa-whatsapp', 
      label: 'WhatsApp', 
      url: 'https://wa.me/224611541829',
      color: '#25D366',
      text: 'Me contacter'
    },
  ];

  private emailService = inject(EmailService);
  readonly form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  showSuccess = signal(false);
  showError = signal(false);

  constructor() {}

  submit() {
    if (this.form.valid) {
      this.isSubmitted.set(true);
      
      const templateParams = {
        from_name: this.form.value.fullName,
        from_email: this.form.value.email,
        subject: this.form.value.subject,
        message: this.form.value.message,
        to_email: 'cherif21975@gmail.com' // Votre email de réception
      };

      this.emailService.sendEmail(templateParams)
        .then((response) => {
          console.log('Email envoyé avec succès!', response.status, response.text);
          this.form.reset();
          this.showSuccess.set(true);
          setTimeout(() => this.showSuccess.set(false), 5000);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
          this.showError.set(true);
          setTimeout(() => this.showError.set(false), 5000);
        })
        .finally(() => {
          this.isSubmitted.set(false);
        });
    }
  }
  
  closeAlert() {
    this.isSubmitted.set(false);
  }
  
  // Gestion des effets de survol
  onHover(index: number | null) {
    this.isHovered.set(index);
  }
}
