import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IAuthRes } from '../../../core/interfaces/IAuthRes';
import { AuthService } from '../../../core/services/auth.service';
import { UserDataService } from '../../../core/services/user-data.service';
import { TokenService } from '../../../core/services/token.service';
import { JwtDecoderService } from '../../../core/services/jwt-decoder.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',

})
export default class LoginComponent {
  private tkService = inject(TokenService);
  private userDataService = inject(UserDataService);
  private jwtDecoderService = inject(JwtDecoderService);
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login(): void {
    const userData = { email: this.email, password: this.password };
    this.authService.loginUser(userData).subscribe({
      next: (res: IAuthRes) => {
        const decodedToken = this.jwtDecoderService.decodeToken(res.data.token);
        this.userDataService.setUserId(decodedToken.userId.toString());
        this.userDataService.setRole(decodedToken.role);
        this.tkService.setToken(res.data.token);
        this.router.navigate(['/']);
        this.toastr.success('Login Exitoso.', 'Success');
      },
      error: (err) => {
        this.toastr.error('Credenciales Inválidas', 'Error');
      }
    });
  }

}
