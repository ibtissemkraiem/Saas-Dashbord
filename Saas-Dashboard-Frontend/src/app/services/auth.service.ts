import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:3000/api/auth'; 
  //private userId:string ;
  private currentUserId: string | null = null;

  constructor(private http:HttpClient) { }

  register(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData)
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  handleLogin(response:any){
    this.currentUserId = response.user.id;
    localStorage.setItem('userId',this.currentUserId!);
  }
 
  getCurrentUserId():string|null{
    return this.currentUserId || localStorage.getItem('userId')
  }
  

  
 
  isAuthenticated(): boolean {
    
   

      const token = localStorage.getItem('token');
      console.log(token);
      return !!token; 
    
    
    //return false;
  }
}  
