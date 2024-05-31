import type { CanMatchFn } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { inject } from '@angular/core';

export const userGuard: CanMatchFn = (route, segments) => {
  const role = inject(UserDataService);
  return role.getRole() === 'user' ?  true : false;
};
