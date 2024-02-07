import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../service/job.service';

@Component({
  selector: 'app-jobs-seeker',
  templateUrl: './jobs-seeker.component.html',
  styleUrl: './jobs-seeker.component.css'
})
export class JobsSeekerComponent {
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

    navigateToJobDetails(jobId: string){
      this.jobService.getJobDetails(jobId).subscribe({
        next:(response: any) => {
          console.log(response); // Log the entire response object
          if (response.job) {
            console.log(response.job.title);
            this.router.navigate(['/jobDetailsSeeker', jobId])
          } else {
            console.log('Job details not found');
          }
        },
        error: (error:any) => {
          console.log('An error occured', error);
          
        }
      })
    }
  
}
