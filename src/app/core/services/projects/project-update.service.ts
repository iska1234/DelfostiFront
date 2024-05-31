import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectUpdateService {
  private projectUpdatedSource = new Subject<void>();
  projectUpdated$ = this.projectUpdatedSource.asObservable();

  notifyProjectUpdated() {
    this.projectUpdatedSource.next();
  }
}
