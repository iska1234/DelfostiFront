import { Routes } from '@angular/router';
import InicioComponent from './inicio/inicio.component';
import  DashboardComponent  from './dashboard/dashboard.component';
import ProjectDetailsComponent from './project-details/project-details.component';
import TasksDetailsComponent from './tasks-details/tasks-details.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: InicioComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'details/:projectId', component: ProjectDetailsComponent },
      { path: 'task-details/:taskId', component: TasksDetailsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
