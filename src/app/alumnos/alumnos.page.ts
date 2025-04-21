import { Component, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel,IonHeader,IonToolbar,IonTitle,IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  standalone: true,
  imports: [IonAccordion, IonAccordionGroup, IonItem, IonLabel,IonHeader,IonToolbar,IonTitle,IonContent],
})
export class AlumnosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
