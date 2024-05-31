import { Routes } from '@angular/router';
import InicioComponent from './inicio/inicio.component';
import  DashboardComponent  from './dashboard/dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: InicioComponent,
    children: [
      { path: '', component: DashboardComponent },
    ],
  },
];
