import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  const tkService = inject(TokenService);

  if(tkService.getToken()){
    return false;
  }else{
    return true;
  }
}
