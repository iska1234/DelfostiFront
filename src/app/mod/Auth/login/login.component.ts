import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IAuthRes } from '../../../core/domain/models/IAuthRes';
import { AuthService } from '../../../core/services/auth.service';
import { UserDataService } from '../../../core/services/user-data.service';
import { TokenService } from '../../../core/services/token.service';
import { JwtDecoderService } from '../../../core/services/jwt-decoder.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatProgressBarModule],
  templateUrl: './login.component.html',

})
export default class LoginComponent {
  private tkService = inject(TokenService);
  private userDataService = inject(UserDataService);
  private jwtDecoderService = inject(JwtDecoderService);
  email: string = '';
  password: string = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login(): void {
    const userData = { email: this.email, password: this.password };
    this.loading = true;
    this.authService.loginUser(userData).subscribe({
      next: (res: IAuthRes) => {
        const decodedToken = this.jwtDecoderService.decodeToken(res.data.token);
        this.userDataService.setUserId(decodedToken.userId.toString());
        this.userDataService.setRole(decodedToken.role);
        this.tkService.setToken(res.data.token);
        this.router.navigate(['/']);
        this.toastr.success('Login Exitoso.', 'Success');
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Credenciales Inválidas', 'Error');
        this.loading = false;
      }
    });
  }


}
