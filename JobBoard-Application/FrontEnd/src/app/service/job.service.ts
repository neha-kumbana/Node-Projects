import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:3000/api/v1/'
  private token = localStorage.getItem('token')

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    })
  };

  constructor(private http:HttpClient) { }

  getAllJobsEmployee(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}employeeJobs`,this.httpOptions);
  }
  
  getJob(jobId:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}employeeJobs/${jobId}`,this.httpOptions)
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}jobs`,this.httpOptions);
  }

  getJobDetails(jobId: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}jobs/${jobId}`,this.httpOptions)
  }

  getPublicJobs(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}public/publicJobs`)
  }
}
