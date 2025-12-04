import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HighlightItem {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About {
  // Timestamp pour forcer le rafraîchissement du cache de l'image
  timestamp = Date.now();

  readonly intro = {
    title: 'Étudiant en Développement Full Stack & Solutions Numériques',
    description: "Je suis Boubacar Cherif Diallo, étudiant en Licence Professionnelle Informatique, passionné par le développement web, l'ingénierie logicielle et la création de solutions numériques utiles. Au fil de mon parcours académique, j'ai acquis des compétences solides en Angular, TypeScript, HTML/CSS, ainsi qu'en modélisation UML/Merise, algorithmique et conception de bases de données, ce qui me permet d'analyser un besoin, le conceptualiser puis le transformer en application fonctionnelle.",
    quote: '\"Je crois en la puissance de la technologie pour transformer les défis en opportunités. Mon ambition est de bâtir des solutions innovantes qui répondent aux besoins spécifiques du continent africain, en particulier dans les domaines de la logistique et de la livraison.\"',
  };

  readonly highlights: HighlightItem[] = [
    { label: 'Années d’expérience', value: '4+', icon: 'fa-briefcase' },
    { label: 'Projets réalisés', value: '8+', icon: 'fa-code' },
    { label: 'Langages maîtrisés', value: '6+', icon: 'fa-laptop-code' },
  ];

}
