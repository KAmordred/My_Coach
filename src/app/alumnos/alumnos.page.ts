import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel,IonHeader,IonToolbar,IonTitle,IonContent,IonButton,IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  standalone: true,
  imports: [CommonModule ,IonAccordion, IonAccordionGroup, IonItem, IonLabel,IonHeader,IonToolbar,IonTitle,IonContent,IonButton,IonIcon],
})

// HAY QUE CAMBIAR LAS ID PARA LOS ALUMNOS 
// HAY QUE VER QUE CONTENIDO SE AGREGARA A CADA ALUMNO 
export class AlumnosPage {
  alumnos = [
    {
      id: 'first',
      nombre: 'Alan Barrera',
      contenido: 'First Content',
      expanded: false
    },
    {
      id: 'second',
      nombre: 'José Calderón',
      contenido: 'Second Content',
      expanded: false
    },
    {
      id: 'third',
      nombre: 'Carlos Araya',
      contenido: 'Third Content',
      expanded: false
    },
    {
      id: 'fourth',
      nombre: 'Andres Carranza',
      contenido: 'Third Content',
      expanded: false
    },
    {
      id: 'five',
      nombre: 'Gina Nexlson',
      contenido: 'GOOOOORDAAAAAAA',
      expanded: false
    }
  ]
  constructor() {
    addIcons({ personCircleOutline }); 
  }
}
