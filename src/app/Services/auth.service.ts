import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {} 

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}`);
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.accessToken;  
        localStorage.setItem('token', token);  
      })
    );
  }

   isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  
  }

  logout(): void {
    localStorage.removeItem('token');  
  }
}
