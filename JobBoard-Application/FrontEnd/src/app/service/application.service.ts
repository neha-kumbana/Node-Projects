import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService{

  private apiUrl = 'http://localhost:3000/api/v1/'
  private token = localStorage.getItem('token')
  private jobId!: string | null
  private appId!: string | null
  private saveId!: string | null

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization : 'Bearer '+this.token
    })
  }

  constructor(private route:ActivatedRoute, private http:HttpClient) { }

  setJobId(jobId: string | null): void {
    this.jobId = jobId;
    console.log("Job", this.jobId);
  }

  setAppId(appId: string | null):void {
    this.appId = appId
    console.log("app", this.appId);
    
  }

  setSaveId(saveId: string | null): void{
    this.saveId = saveId;
    console.log("Save", this.saveId);
    
  }

  createApplication(jobId: string, education: string, experience: string, skills: string, resume: File, contactDetails: string): Observable<any>{
    if(!jobId){
      throw new Error('JobId not found')
    }
    const formData = new FormData()
    formData.append('education', education)
    formData.append('experience', experience)
    formData.append('skills', skills)
    formData.append('resume', resume)
    formData.append('contactDetails', contactDetails)
    formData.append('job', jobId)

    return this.http.post(`${this.apiUrl}application`, formData, this.httpOptions)
  }

  getJobs(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}application`, this.httpOptions)
  }

  saveJob(jobId: string, title: string, skills: string, rolesAndResponsibilities: string, location: string, company: string): Observable<any>{
    if(!jobId){
      throw new Error('JobId not found')
    }
    const formData = new FormData()
    formData.append('title', title)
    formData.append('skills', skills)
    formData.append('rolesAndResponsibilities', rolesAndResponsibilities)
    formData.append('location', location)
    formData.append('company', company)
    formData.append('job', jobId)
    
    return this.http.post<any>(`${this.apiUrl}save`, formData, this.httpOptions)
  }

  getSavedJobs():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}save`, this.httpOptions)
  }

  deleteSavedJob(saveId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}save/${saveId}`, this.httpOptions)
  }
}
