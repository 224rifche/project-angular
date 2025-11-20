import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface ContactDetail {
  icon: string;
  label: string;
  value: string;
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
    { icon: 'fa-envelope', label: 'Email', value: 'sow1998dara@gmail.com' },
    { icon: 'fa-phone', label: 'Téléphone', value: '+224 629 291 736' },
    { icon: 'fa-map-marker-alt', label: 'Localisation', value: 'Conakry, Guinée' },
  ];

  readonly languages = ['Français (Courant)', 'Anglais (Scolaire)'];

  readonly stats: ContactStat[] = [
    { label: 'Projets totaux', value: '35', note: '+2 ce mois' },
    { label: 'Clients satisfaits', value: '18', note: '+1 cette semaine' },
    { label: "Années d'expérience", value: '5', note: '+1 cette année' },
  ];

  readonly socialLinks = [
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', url: 'https://linkedin.com/in/darasow' },
    { icon: 'fab fa-github', label: 'GitHub', url: 'https://github.com/darasow' },
    { icon: 'fab fa-facebook-f', label: 'Facebook', url: 'https://facebook.com/darasow' },
    { icon: 'fab fa-whatsapp', label: 'WhatsApp', url: 'https://wa.me/224629291736' },
  ];

  readonly form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly isSubmitted = signal(false);

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: intégrer ContactService pour envoi réel
    console.log('Contact payload', this.form.value);
    this.isSubmitted.set(true);
    this.form.reset();
  }

  closeAlert(): void {
    this.isSubmitted.set(false);
  }
}
