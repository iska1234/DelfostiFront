import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTasksRepository } from '../repositories/tasks-repository';
import { ITaskRes } from '../models/ITask';

@Injectable({ providedIn: 'root' })
export class TasksUseCases {
  constructor(private tasksRepository: HttpTasksRepository) {}

  getTasksForProject(projectId: number): Observable<ITaskRes[]> {
    return this.tasksRepository.getTasksForProject(projectId);
  }

  getTasksForUser(userId: string): Observable<ITaskRes[]> {
    return this.tasksRepository.getTasksForUser(userId);
  }

  addNewTask(task: ITaskRes): Observable<any> {
    return this.tasksRepository.addNewTask(task);
  }

  getTaskById(taskId: number): Observable<ITaskRes> {
    return this.tasksRepository.getTaskById(taskId);
  }

}
