import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { getAuthHeaders } from '../../utils/auth-headers.util';
import { TokenService } from '../../services/token.service';
import { IProyecto } from '../models/IProyecto';
import { TasksRepository } from '../repositories-interface/tasks-repository.interface';
import { ITaskRes } from '../models/ITask';


@Injectable()
export class HttpTasksRepository implements TasksRepository {
  private baseUrl = 'http://localhost:5500/tasks';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getTasksForProject(projectId: number): Observable<ITaskRes[]> {
    const url = `${this.baseUrl}/all-project/${projectId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        const tareasOrdenadas = response.data.sort((a: ITaskRes, b: ITaskRes) =>
          (a.taskid ?? 0) - (b.taskid ?? 0)
        );
        return tareasOrdenadas;
      })
    );
  }

  getTasksForUser(userId: string): Observable<ITaskRes[]> {
    const url = `${this.baseUrl}/all-user/${userId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.get<ITaskRes[]>(url, { headers });
  }

  addNewTask(task: ITaskRes): Observable<any> {
    const url = `${this.baseUrl}/create`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.post<any>(url, task, { headers });
  }
  getTaskById(taskId: number): Observable<ITaskRes> {
    const url = `${this.baseUrl}/details/${taskId}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.get<any>(url, { headers }).pipe(
      map(response => response.data)
    );
  }
}
