
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, AuthRequest, ApiResponse } from '../core/services/authservice';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]]

    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerData: AuthRequest = this.registerForm.value;
  
      this.authService.register(registerData).subscribe({
        next: (response: ApiResponse) => {
          console.log('Registration successful', response);
  
          // ✅ Success snackbar
          this.snackBar.open('✅ User registered successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'success-snackbar'
          });
  
          // ✅ Redirect to login
          this.router.navigate(['/login']).then(success => {
            if (!success) {
              this.snackBar.open('Registered but failed to redirect to login', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: 'error-snackbar'
              });
            }
          });
        },
  
        error: (err) => {
          console.error('Registration error:', err);
  
          const backendMessage = err?.error?.message || '';
          let errorMsg = '❌ Registration failed';
  
          if (backendMessage.toLowerCase().includes('exists')) {
            errorMsg = '⚠️ User already exists';
          } else if (backendMessage) {
            errorMsg = backendMessage;
          }
  
          // ❌ Error snackbar
          this.snackBar.open(errorMsg, 'Close', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'error-snackbar'
          });
        }
      });
  
    } else {
      // ⚠️ Form invalid snackbar
      this.snackBar.open('⚠️ Please fill out the form correctly', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'error-snackbar'
      });
    }
  }
  
}