import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="section">
      <div class="container">
        <h1 class="title">Contact</h1>
        <div class="columns">
          <div class="column is-half">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                  <input 
                    class="input" 
                    type="text" 
                    formControlName="name"
                    [class.is-danger]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
                </div>
                <p *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched" class="help is-danger">
                  Le nom est requis
                </p>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input 
                    class="input" 
                    type="email" 
                    formControlName="email"
                    [class.is-danger]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                </div>
                <p *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" class="help is-danger">
                  Un email valide est requis
                </p>
              </div>

              <div class="field">
                <label class="label">Message</label>
                <div class="control">
                  <textarea 
                    class="textarea" 
                    formControlName="message"
                    [class.is-danger]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                  </textarea>
                </div>
                <p *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" class="help is-danger">
                  Le message est requis
                </p>
              </div>

              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-primary" [disabled]="!contactForm.valid">
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="column is-half">
            <div class="contact-info">
              <h2 class="subtitle">Coordonnées</h2>
              <p><i class="fas fa-envelope"></i> email@example.com</p>
              <p><i class="fas fa-phone"></i> +33 6 12 34 56 78</p>
              <p><i class="fas fa-map-marker-alt"></i> Ville, Pays</p>
              
              <div class="social-links">
                <a href="#" class="button is-light">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#" class="button is-light">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#" class="button is-light">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-form {
      max-width: 500px;
      margin: 0 auto;
    }
    .contact-info {
      padding: 2rem;
      background-color: #f5f5f5;
      border-radius: 5px;
      height: 100%;
    }
    .social-links {
      margin-top: 2rem;
    }
    .social-links .button {
      margin-right: 0.5rem;
    }
    .fa, .fas, .fab {
      margin-right: 0.5rem;
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulaire soumis', this.contactForm.value);
      // Ici, vous pourriez ajouter la logique pour envoyer le formulaire
      this.contactForm.reset();
    }
  }
}
