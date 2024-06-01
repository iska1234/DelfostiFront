import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { UserDataService } from '../services/user-data.service';


export const bossGuard: CanMatchFn = (route, segments) => {
  const role = inject(UserDataService);
  return role.getRole() === 'jefe_proyecto' ? true:false;
};
