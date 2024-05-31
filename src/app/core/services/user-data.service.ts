import { Injectable } from '@angular/core';

const ROLE = "__rol__";
const USER_ID = "__userId__";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  public setRole(role: string): void {
    window.sessionStorage.setItem(ROLE, role);
  }

  public getRole(): string {
    return window.sessionStorage.getItem(ROLE) || "";
  }

  public removeRole(): void {
    window.sessionStorage.removeItem(ROLE);
  }

  public setUserId(userId: string): void {
    window.sessionStorage.setItem(USER_ID, userId);
  }

  public getUserId(): string {
    return window.sessionStorage.getItem(USER_ID) || "";
  }

  public removeUserId(): void {
    window.sessionStorage.removeItem(USER_ID);
  }
}
