import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:3000/api/auth'; 

  constructor(private http:HttpClient) { }

  register(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData)
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  isAuthenticated(): boolean {
    // Ensure window object (and localStorage) exists before accessing it
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token; // Returns true if token exists, false otherwise
    }
    return false;
  }
}  
