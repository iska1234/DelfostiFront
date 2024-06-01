import { Routes } from '@angular/router';
import InicioComponent from './inicio/inicio.component';
import TareasComponent from './tareas/tareas.component';
import TareaDetailsComponent from './tarea-details/tarea-details.component';



export const USER_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: InicioComponent,
    children: [
      { path: '', component: TareasComponent },
      { path: 'tarea-details/:taskId', component: TareaDetailsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
