import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/enviroment-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/register`, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, userData);
  }

  logoutUser(): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/logout`, {});
  }

}
