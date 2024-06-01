import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { userGuard } from './core/guards/user.guard';
import { bossGuard } from './core/guards/boss.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./mod/Auth/login/login.component'),
    canMatch:[authGuard]
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./mod/Auth/register/register.component'),
  },
  {
    path: '',
    loadChildren: () => import('./mod/Admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canMatch:[adminGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./mod/User/user.routes').then((r) => r.USER_ROUTES),
      canMatch:[userGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./mod/Boss/boss.routes').then((r) => r.BOSS_ROUTES),
      canMatch:[bossGuard]
  },
];
