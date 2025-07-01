import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthRequest, AuthService } from '../core/services/authservice';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { LoadingSnackbarComponent } from '../loading-snackbar/loading-snackbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  message:string='';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    console.log("Is logged in "+this.authService.isLoggedIn())
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: AuthRequest = this.loginForm.value;
  
      const loadingRef: MatSnackBarRef<any> = this.snackBar.openFromComponent(LoadingSnackbarComponent, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'white-snackbar'
      });
  
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          loadingRef.dismiss();
  
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom'
            
          });
  
          this.router.navigate(['/dashboard']).then(success => {
            if (!success) {
              console.error('Navigation to /dashboard failed');
              this.message = 'Login successful, but failed to redirect to dashboard';
            }
          });
        },
        error: (err) => {
          loadingRef.dismiss();
          this.message = err.message || 'Login failed';
          this.snackBar.open('Incorrect username or password.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
             panelClass: 'error-snackbar'
          });
        }
      });
    } else {
      this.message = 'Please fill out the form correctly';
    }
  }
  
}
