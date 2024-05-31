import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProjectsRepository } from '../repositories/projects-repository';
import { IProyecto } from '../models/IProyecto';


@Injectable({ providedIn: 'root' })
export class ProjectsUseCases {
  constructor(private projectsRepository: HttpProjectsRepository) {}

  getAllProjects(): Observable<IProyecto[]> {
    return this.projectsRepository.getAllProjects();
  }

  getMonthsProjects(id: string): Observable<any> {
    return this.projectsRepository.getMonthsProjects(id);
  }

  saveNewProject(body: IProyecto): Observable<any> {
    return this.projectsRepository.saveNewProject(body);
  }
}
