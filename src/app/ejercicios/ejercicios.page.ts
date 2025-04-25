import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,IonNote,IonAccordionGroup,IonAccordion,IonItem,IonLabel} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,FormsModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,IonCardContent,IonNote,IonAccordionGroup,IonAccordion,IonItem,IonLabel  ]
})
export class EjerciciosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
