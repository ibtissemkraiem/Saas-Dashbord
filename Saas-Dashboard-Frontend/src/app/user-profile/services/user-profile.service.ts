import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';




interface PaginatedResponse {
  data: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService  {
  
  private apiUrl='http://localhost:3000/api/users'; 
  private apiUrl1=' http://localhost:3000/uploads/upload-image';

  constructor( private http:HttpClient,private authService:AuthService) { }

  getUserById(id: any):Observable<any>{
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${id}`,{headers})
    
  }

  EditProfile(id:any,credentials: any):Observable<any>{
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`,credentials,{headers})

  }


  DeleteUser(id:any):Observable<any>{
    const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`,{headers})

  }
  uploadProfileImage(file:File):Observable<any>
{
  const token = localStorage.getItem('token');
  console.log(token)

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  const formData = new FormData();
  formData.append('image',file);


  return this.http.post(this.apiUrl1,formData,{headers})
}


getUserProfile():Observable<any>{
  const userId = this.authService.getCurrentUserId();
  return this.getUserById(userId);
}

TotalUsers():Observable<any>{
  const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/total-users`,{headers})

}
 AllUsers(page: number, limit: number):Observable<any>{
  const token = localStorage.getItem('token');
    console.log(token)

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<PaginatedResponse>(`${this.apiUrl}/?page=${page}&limit=${limit}`,{headers})

}

}
