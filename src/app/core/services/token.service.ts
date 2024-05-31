import { Injectable } from '@angular/core';
const ACCESS_TOKEN = "accessToken";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(tk: string): void {
    window.sessionStorage.setItem(ACCESS_TOKEN, tk);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(ACCESS_TOKEN) || "";
  }

  public rmToken(): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
  }
}
