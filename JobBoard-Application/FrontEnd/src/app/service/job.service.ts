import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  updateJobDetails(jobId: string, updatedJob: {title: string, skills: string, rolesAndResponsibilities: string, location: string, company: string, category: string}): Observable<any> {    
    const formData = new FormData();
    formData.append('title', updatedJob.title);
    formData.append('skills', updatedJob.skills);
    formData.append('rolesAndResponsibilities', updatedJob.rolesAndResponsibilities);
    formData.append('location', updatedJob.location);
    formData.append('company', updatedJob.company);
    formData.append('category', updatedJob.category)
    return this.http.patch<any>(`${this.apiUrl}employeeJobs/${jobId}`, formData, this.httpOptions)
  }

  deleteJobDetails(jobId: string){
    return this.http.delete<any>(`${this.apiUrl}employeeJobs/${jobId}`,this.httpOptions)
  }

  getJobSearch(skills?: string, title?: string, company?: string, location?: string, category?: string): Observable<any>{
    let params = new HttpParams()

    if(skills){
      params = params.set('skills', skills)
    }
    if(location){
      params = params.set('location', location)
    }
    if(company){
      params = params.set('company', company)
    }
    if(title){
      params = params.set('title', title)
    }   
    if(category){
      params = params.set('category', category)
    } 
    console.log("params:", params.toString());
    
    return this.http.get<any>(`${this.apiUrl}jobs/search`,{params: params, headers: this.httpOptions.headers})
  }

  createJob(title: string, skills: string, rolesAndResponsibilities: string, location: string, company: string, category: string): Observable<any>{
    const formData = new FormData();
    formData.append('title', title);
    formData.append('skills', skills);
    formData.append('rolesAndResponsibilities', rolesAndResponsibilities);
    formData.append('location', location);
    formData.append('company', company)
    formData.append('category', category)
    
    return this.http.post<any>(`${this.apiUrl}employeeJobs`, formData, this.httpOptions)
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
  
  getApplications(job?: string): Observable<any>{
    let params = new HttpParams()
    if(job){
      params = params.set('job', job)
    }
    console.log("params:", params.toString());
    return this.http.get<any>(`${this.apiUrl}application/jobID`, {params: params, headers: this.httpOptions.headers})
  }
  
}
