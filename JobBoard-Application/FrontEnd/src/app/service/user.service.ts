import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/v1'
  private token = localStorage.getItem('token')

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization : 'Bearer '+this.token
    })
  }
  constructor(private http:HttpClient) { }

  getUser(userId: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/profile/user/${userId}`, this.httpOptions)
  }

  // updateUser(userId: string, updateUser:{
  //   username: string, 
  //   company: string, 
  //   location: string, 
  //   industry: string, 
  //   website: string, 
  //   education: string, 
  //   experience: string, 
  //   skills: string, 
  //   contactDetails: string}){
  //   const formData = new FormData()
  //   formData.append('username', updateUser.username)
  //   formData.append('company', updateUser.company)
  //   formData.append('location', updateUser.location)
  //   formData.append('industry', updateUser.industry)
  //   formData.append('website', updateUser.website)
  //   formData.append('education', updateUser.education)
  //   formData.append('experience', updateUser.experience)
  //   formData.append('skills', updateUser.skills)
  //   formData.append('contactDetails', updateUser.contactDetails)

    
  //   return this.http.patch<any>(`${this.apiUrl}/profile/user/${userId}`, formData, this.httpOptions)
  // }

  // updateUser(userId: string, updateUser: {
  //   [key: string]: string | undefined; 
  // }) {
  //   const formData = new FormData();

  //   for (const key of Object.keys(updateUser)) {
  //     const value = updateUser[key];
  //     if (value !== undefined) {
  //       formData.append(key, value);
  //     }
  //   }

  //   return this.http.patch<any>(`${this.apiUrl}/profile/user/${userId}`, formData, this.httpOptions);
  // }

  updateUser(userId: string, formData: FormData) {
    return this.http.patch<any>(`${this.apiUrl}/profile/user/${userId}`, formData, this.httpOptions);
  }
  

}
