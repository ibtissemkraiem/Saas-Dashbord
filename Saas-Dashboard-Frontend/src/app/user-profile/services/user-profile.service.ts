import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService  {
  
  private apiUrl='http://localhost:3000/api/users'; 
  private apiUrl1=' http://localhost:3000/uploads/upload-image';

  constructor( private http:HttpClient) { }

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
}}
