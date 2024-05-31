import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',

})
export default class RegisterComponent {

  user: any = {};


  constructor(private authService: AuthService,private toastr: ToastrService, private router: Router) { }

  submitForm(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Error');
      return;
    }

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
      },
      error => {
        this.toastr.error('Error al registrar el usuario', 'Error');
      }
    );
  }


  navigateToLogin() {
    this.router.navigate(['/login']);  // Navega a la página de login
  }
}
