import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { getAuthHeaders } from '../../utils/auth-headers.util';
import { TokenService } from '../../services/token.service';
import { ProjectsRepository } from '../repositories-interface/projects-repository.interface';
import { IProyecto } from '../models/IProyecto';


@Injectable()
export class HttpProjectsRepository implements ProjectsRepository {
  private baseUrl = 'http://localhost:5500/projects';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllProjects(): Observable<IProyecto[]> {
    const url = `${this.baseUrl}/all`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.get<any>(url, { headers }).pipe(
      map(response => response.data)
    );
  }

  getMonthsProjects(id: string): Observable<any> {
    const url = `${this.baseUrl}/fechas/${id}`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.get<any>(url, { headers }).pipe(
      map(response => response.data)
    );
  }

  saveNewProject(body: IProyecto): Observable<any> {
    const url = `${this.baseUrl}/create`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http.post<any>(url, body, { headers });
  }
}
