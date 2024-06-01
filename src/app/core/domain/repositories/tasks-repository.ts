import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { getAuthHeaders } from '../../utils/auth-headers.util';
import { TokenService } from '../../services/token.service';
import { IProyecto } from '../models/IProyecto';
import { TasksRepository } from '../repositories-interface/tasks-repository.interface';
import { ITaskRes } from '../models/ITask';
import { BASE_URL } from '../../utils/enviroment-url';

@Injectable()
export class HttpTasksRepository implements TasksRepository {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getTasksForProject(projectId: number): Observable<ITaskRes[]> {
    const url = `${BASE_URL}/tasks/all-project/${projectId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        const tareasOrdenadas = response.data.sort(
          (a: ITaskRes, b: ITaskRes) => (a.taskid ?? 0) - (b.taskid ?? 0)
        );
        return tareasOrdenadas;
      })
    );
  }

  getTasksForUser(userId: string) {
    const url = `${BASE_URL}/tasks/all-user/${userId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http
      .get<{ data: ITaskRes[] }>(url, { headers })
      .pipe(map((response) => response.data));
  }
  addNewTask(task: ITaskRes): Observable<any> {
    const url = `${BASE_URL}/tasks/create`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.post<any>(url, task, { headers });
  }
  getTaskById(taskId: number): Observable<ITaskRes> {
    const url = `${BASE_URL}/tasks/details/${taskId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http
      .get<any>(url, { headers })
      .pipe(map((response) => response.data));
  }

  updateTaskForRevision(taskId: number): Observable<any> {
    const url = `${BASE_URL}/tasks/update/revision/${taskId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.patch<any>(url, {}, { headers });
  }

  updateTaskCompleted(taskId: number): Observable<any> {
    const url = `${BASE_URL}/tasks/update/completada/${taskId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.patch<any>(url, {}, { headers });
  }
}
