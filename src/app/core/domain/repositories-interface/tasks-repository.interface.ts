import { Observable } from 'rxjs';
import { ITaskRes } from '../models/ITask';


export interface TasksRepository {
  getTasksForProject(projectId: number): Observable<ITaskRes[]>;
  getTasksForUser(userId: string): Observable<ITaskRes[]>;
  addNewTask(task: ITaskRes): Observable<any>;
  getTaskById(taskId: number): Observable<ITaskRes>;
}
