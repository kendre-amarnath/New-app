import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { DataService } from './dataservice';
import { DataTransferService } from './data-transfer-service';

export interface AuthResponse {
  jwt: string;
}

export interface ApiResponse {
  message: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'jwt_token';
  private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient, private router:Router,private datatransfer:DataTransferService) {}

  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

                        login(userData: { username: string; password: string }): Observable<any> {
                          return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData).pipe(
                            tap(response => this.setToken(response.jwt)),
                            
                            catchError(error => {
                              let errorMessage = 'Login failed';
                              if (error.status === 401) {
                                errorMessage = 'Invalid username or password';
                              }
                              return throwError(() => new Error(errorMessage));
                            })
                          );
                        }
                        

            isLoggedIn(): boolean {
              return !!this.getToken();
            }

  public isAuthenticated() : boolean {
    const token = localStorage.getItem(this.tokenKey)
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    console.log("is token expired: "+helper.isTokenExpired(token))
    return !isExpired;
  }

  logout(): void {
    console.log('Logging out, removing token');
    localStorage.removeItem(this.tokenKey);
    this.authStateSubject.next(false);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getProtectedResource(): Observable<string> {
    const token = this.getToken();
    if (!this.isAuthenticated()) {
      console.error('No valid token, redirecting to login');
      this.router.navigate(['/login']);
      return throwError(() => new Error('Unauthorized: Please log in'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:8080/api/userdata', { headers, responseType: 'text' }).pipe(
      catchError(error => {
        let errorMessage = 'Failed to access protected resource';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid or expired token';
          this.logout();
        }
        console.error('Protected resource error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}