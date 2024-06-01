import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './register.component.html',

})
export default class RegisterComponent {

  user: any = {};
  loading = false;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  submitForm(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Error');
      return;
    }

    this.loading = true;

    const userData = {
      name: registerForm.value.name,
      email: registerForm.value.email,
      password: registerForm.value.password,
      age: registerForm.value.age
    };

    this.authService.registerUser(userData).subscribe(
      response => {
        this.toastr.success('Usuario registrado correctamente.', 'Success');
        registerForm.resetForm();
        this.loading = false;
      },
      error => {
        this.toastr.error('Error al registrar el usuario', 'Error');
        this.loading = false;
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
