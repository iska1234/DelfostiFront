import { Observable } from 'rxjs';
import { ITaskRes } from '../models/ITask';


export interface TasksRepository {
  getTasksForProject(projectId: number): Observable<ITaskRes[]>;
  getTasksForUser(userId: string): Observable<ITaskRes[]>;
  addNewTask(task: ITaskRes): Observable<any>;
  getTaskById(taskId: number): Observable<ITaskRes>;
  updateTaskForRevision(taskId: number): Observable<any>;
  updateTaskCompleted(taskId: number): Observable<any>;
  updateTaskDeclined(taskId: number): Observable<any>;
}
