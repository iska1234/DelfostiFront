import { Observable } from 'rxjs';
import { IProyecto } from '../models/IProyecto';


export interface ProjectsRepository {
  getAllProjects(): Observable<IProyecto[]>;
  getMonthsProjects(id: string): Observable<any>;
  saveNewProject(body: IProyecto): Observable<any>;
}
