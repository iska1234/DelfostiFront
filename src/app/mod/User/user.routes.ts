import { Routes } from '@angular/router';
import InicioComponent from './inicio/inicio.component';
import TareasComponent from './tareas/tareas.component';



export const USER_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: InicioComponent,
    children: [
      { path: '', component: TareasComponent },


    ],
  },
];
