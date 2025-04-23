import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonCol, IonRow, IonButton, IonInput, 
  IonLabel, IonGrid, IonItem 
} from '@ionic/angular/standalone';
import { Chart, registerables } from 'chart.js';
import { AnnotationOptions } from 'chartjs-plugin-annotation';
import annotationPlugin from 'chartjs-plugin-annotation';

// Extender tipos para Chart.js
declare module 'chart.js' {
  interface PluginOptions {
    annotation: {
      annotations: Record<string, AnnotationOptions>;
    };
  }
  interface AnnotationLabelOptions {
    position?: 'left' | 'center' | 'right' | 'top' | 'bottom';
  }
}

// Registrar componentes de Chart.js y plugins
Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCol,
    IonRow,
    IonButton,
    IonInput,
    IonLabel,
    IonGrid,
    IonItem
  ]
})
export class ImcPage implements AfterViewInit {
  @ViewChild('imcChart') chartRef!: ElementRef;
  chart: any;
  
  // Variables para el formulario
  peso: number = 0;
  altura: number = 0;
  imc: number = 0;
  
  // Historial de mediciones
  historial: { fecha: string, peso: number, altura: number, imc: number }[] = [];

  constructor() {
    // Cargar historial desde localStorage
    this.cargarHistorial();
  }

  ngAfterViewInit(): void {
    this.inicializarGrafico();
  }

  private cargarHistorial(): void {
    const savedData = localStorage.getItem('imcHistorial');
    if (savedData) {
      this.historial = JSON.parse(savedData);
    }
  }

  calcularIMC(): void {
    if (this.peso > 0 && this.altura > 0) {
      this.imc = this.peso / ((this.altura / 100) ** 2);
      this.agregarAlHistorial();
      this.actualizarGrafico();
    }
  }

  private agregarAlHistorial(): void {
    const nuevaMedicion = {
      fecha: new Date().toLocaleDateString(),
      peso: this.peso,
      altura: this.altura,
      imc: parseFloat(this.imc.toFixed(2))
    };

    this.historial.push(nuevaMedicion);
    localStorage.setItem('imcHistorial', JSON.stringify(this.historial));
  }

  private inicializarGrafico(): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    
    this.chart = new Chart(ctx, {
      type: 'line',
      plugins: [annotationPlugin],
      data: {
        labels: this.historial.map(item => item.fecha),
        datasets: [{
          label: 'IMC',
          data: this.historial.map(item => item.imc),
          borderColor: '#3880ff',
          backgroundColor: 'rgba(56, 128, 255, 0.2)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#3880ff',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: 15,
            suggestedMax: 40,
            title: {
              display: true,
              text: 'Valor IMC',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Fecha de medición',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 16
            },
            bodyFont: {
              size: 14
            }
          },
          annotation: {
            annotations: this.obtenerAnotacionesIMC()
          }
        }
      }
    });
  }

  private actualizarGrafico(): void {
    if (this.chart) {
      this.chart.data.labels = this.historial.map(item => item.fecha);
      this.chart.data.datasets[0].data = this.historial.map(item => item.imc);
      this.chart.update();
    }
  }

  private obtenerAnotacionesIMC(): Record<string, AnnotationOptions> {
    return {
      bajoPeso: {
        type: 'line',
        yMin: 18.5,
        yMax: 18.5,
        borderColor: 'orange',
        borderWidth: 2,
        borderDash: [6, 6],
        label: {
          content: 'Bajo peso',
          display: true,
          position: 'start',
          backgroundColor: 'orange',
          color: 'white',
          font: {
            weight: 'bold'
          }
        }
      },
      normal: {
        type: 'line',
        yMin: 25,
        yMax: 25,
        borderColor: 'green',
        borderWidth: 2,
        borderDash: [6, 6],
        label: {
          content: 'Peso normal',
          display: true,
          position: 'start',
          backgroundColor: 'green',
          color: 'white',
          font: {
            weight: 'bold'
          }
        }
      },
      sobrepeso: {
        type: 'line',
        yMin: 30,
        yMax: 30,
        borderColor: 'red',
        borderWidth: 2,
        borderDash: [6, 6],
        label: {
          content: 'Sobrepeso',
          display: true,
          position: 'start',
          backgroundColor: 'red',
          color: 'white',
          font: {
            weight: 'bold'
          }
        }
      }
    };
  }

  limpiarDatos(): void {
    this.historial = [];
    localStorage.removeItem('imcHistorial');
    this.actualizarGrafico();
  }

  getIMCCategory(imc: number): string {
    if (imc < 18.5) return 'Bajo peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    return 'Obesidad';
  }
}