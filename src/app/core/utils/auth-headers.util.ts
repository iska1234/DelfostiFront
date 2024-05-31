import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../services/token.service';

export function getAuthHeaders(tokenService: TokenService): HttpHeaders {
  const token = tokenService.getToken();
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}
