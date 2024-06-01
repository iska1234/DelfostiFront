import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksUpdateService {
  private taskUpdatedSource = new Subject<void>();
  taskUpdated$ = this.taskUpdatedSource.asObservable();

  notifyTaskUpdated() {
    this.taskUpdatedSource.next();
  }
}
