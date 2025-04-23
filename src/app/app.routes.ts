import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'perfil-alumno',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'alumnos',
    loadComponent: () => import('./alumnos/alumnos.page').then( m => m.AlumnosPage)
  },
  {
    path: 'perfil-alumno',
    loadComponent: () => import('./perfil-alumno/perfil-alumno.page').then(m => m.ImcPage)
  },


];
