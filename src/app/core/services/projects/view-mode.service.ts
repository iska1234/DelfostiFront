import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {
  private readonly SESSION_STORAGE_KEY = 'viewMode';

  constructor() { }

  setViewMode(viewMode: string): void {
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, viewMode);
  }

  getViewMode(): string | null {
    return sessionStorage.getItem(this.SESSION_STORAGE_KEY);
  }
}
