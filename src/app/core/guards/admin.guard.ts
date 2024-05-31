import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

export const adminGuard: CanMatchFn = (route, state) => {
  const role = inject(UserDataService);

  return role.getRole() === 'admin' ? true:false;
};
