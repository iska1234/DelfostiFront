import { BASE_URL } from './../../utils/enviroment-url';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { getAuthHeaders } from '../../utils/auth-headers.util';
import { IUsersRes } from '../models/IUsersRes';

import { TokenService } from '../../services/token.service';
import { AdminRepository } from '../repositories-interface/admin-repository.interface';


@Injectable()
export class HttpAdminRepository implements AdminRepository {


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllUsers(): Observable<IUsersRes[]> {
    const url = `${BASE_URL}/admin/users/all`;
    const headers = getAuthHeaders(this.tokenService);
    return this.http
      .get<any>(url, { headers })
      .pipe(map((response) => response.data));
  }
}
