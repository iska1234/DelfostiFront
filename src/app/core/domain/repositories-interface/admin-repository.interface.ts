import { Observable } from 'rxjs';
import { IUsersRes } from '../models/IUsersRes';


export interface AdminRepository {
  getAllUsers(): Observable<IUsersRes[]>;
  getUserProjectId(userId: number): Observable<number>;
  updateJefeRole(userId: number): Observable<any>;
}
