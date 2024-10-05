import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected styleUrl to styleUrls
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';  
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the service to log in the user
      this.authService.login({ email, password }).subscribe(
        (response) => {
          this.successMessage = response.message; // Store the success message
          this.errorMessage = '';
          this.loginForm.reset(); // Reset the form after successful login
        },
        (error) => {
          this.errorMessage = error.error.message; // Handle error message
          this.successMessage = '';
        }
      );
    }
  }
}