import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit{
  jobs: any [] = []

  
  constructor(private jobService:JobService, private router:Router){}
  ngOnInit(): void {
      this.fetchJobs()
  }

  fetchJobs():void{
    this.jobService.getAllJobsEmployee().subscribe({
      next:(response: any) => {
        this.jobs = response.jobs
      },
      error: (error: any) => {
        console.log('Error fecthing jobs', error);
        
      }
    })
    }

    navigateToJobDetails(jobId:string){      
      this.jobService.getJob(jobId).subscribe({
        next: (response: any) => {
          console.log(response.job); 
          this.router.navigate(['/job-details', jobId]);
        },
        error: (error: any) => {
          console.log('Error fetching job:', error);
        }
      });
  }
}
