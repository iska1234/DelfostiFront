import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsersRes } from '../models/IUsersRes';
import { HttpAdminRepository } from '../repositories/admin-repository';


@Injectable({ providedIn: 'root' })
export class AdminUseCases {
  constructor(private adminRepository: HttpAdminRepository) {}

  execute(): Observable<IUsersRes[]> {
    return this.adminRepository.getAllUsers();
  }
}