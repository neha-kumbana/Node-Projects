import { Component } from '@angular/core';
import { JobService } from '../service/job.service';
import { ApplicationService } from '../service/application.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


interface QueryParams{
  technology?: string,
  finance?: string,
  marketing?: string,
  category?: string 
}

interface Application {
  _id: string;
  education: string;
  experience: string;
  skills: string;
  contactDetails: string;
  job: string;
}


@Component({
  selector: 'app-recent-jobs',
  templateUrl: './recent-jobs.component.html',
  styleUrl: './recent-jobs.component.css'
})
export class RecentJobsComponent {
  jobs: any[] = []

  technology: boolean = false
  finance: boolean = false
  marketing: boolean = false
  

  queryParams: QueryParams = {}

  displayedJobs: any[] = []; // Initially displayed jobs
  initialDisplayCount: number = 3;
  batchSize: number = 3; // Number of jobs to display initially
  currentIndex: number = 0; 

  showCheckBoxContainer: boolean = false
  constructor(private jobSerivce:JobService, private applicationService:ApplicationService, private authService:AuthService, private toastr:ToastrService, private router:Router){}
  ngOnInit(): void {
    this.fetchJobs()
  }

  fetchJobs(): void {
  const role = this.authService.getUserRole();
  console.log(role);
  
  if (role == 'Employer') {
    this.jobSerivce.getAllJobs().subscribe({
      next: (response: any) => {
        this.jobs = response.jobs;
        this.updateDisplayedJobs(); 
      },
      error: (error: any) => {
        console.log('Error while fetching jobs', error);
      }
    });
  } else {
    this.jobSerivce.getPublicJobs().subscribe({
      next: (response: any) => {
        response.jobs.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        // this.jobs = response.jobs.slice(0, 3);
        this.jobs = response.jobs;
        this.updateDisplayedJobs(); 
      },
      error: (error: any) => {
        console.log('Error fetching jobs', error);
      }
    });
  }
}

  navigateToJobDetails(jobId: string){
    const token = this.authService.getToken()
    if(token){
      this.jobSerivce.getJobDetails(jobId).subscribe({
        next:(response: any) => {
          if (response.job) {
            this.router.navigate(['/jobDetailsSeeker', jobId])
          } else {
            console.log('Job details not found');
          }
        },
        error: (error:any) => {
          console.log('An error occured', error);
          
        }
      })
    }else{
      this.toastr.error('Login to apply for a job')
    }
    
  }

  updateDisplayedJobs(): void {
    this.displayedJobs = this.jobs.slice(this.currentIndex, this.currentIndex + this.initialDisplayCount);
  }

  showMoreAvailable(): boolean {
    return this.currentIndex + this.batchSize < this.jobs.length;
  }

  showMore(): void {
    this.currentIndex += this.batchSize;
  
    this.displayedJobs = this.displayedJobs.concat(
      this.jobs.slice(this.currentIndex, this.currentIndex + this.batchSize)
    );
  }

  showCategory(): void{
    this.showCheckBoxContainer = !this.showCheckBoxContainer
  }

  search(){
    const token = localStorage.getItem('token')
    if(token){
      this.queryParams = {};
      if(this.technology){
        this.queryParams.category = 'technology'
      }
      if(this.finance){
        this.queryParams.category = 'finance'
      }
      if(this.marketing){
        this.queryParams.category = 'marketing'
      }
      
      console.log("Query params:", this.queryParams);
      this.router.navigate(['/searchJobs'], {queryParams : this.queryParams})   
    }else{
      this.toastr.error('Login to view the jobs')
    }

  }
    
  getMyJobs(){
    this.applicationService.getJobs().subscribe({
      next: (response: any) => {
        console.log("Response: ", response);
        const jobIds = response.apps.map((app:Application) => app.job)
        console.log("Job:", jobIds);
        const observable = jobIds.map((jobId: string) => this.jobSerivce.getJobDetails(jobId))
        forkJoin(observable).subscribe({
          next: (response: any) => {
            console.log("Response jobs", response);
            const jobIdString = jobIds.join(',')
            this.router.navigate(['jobsApplied'], {queryParams: {jobId: jobIdString}})
          },
          error: (error: any) => {
            console.log("An error occured", error);
            
          }
        })        
      }
    })
  }
}
