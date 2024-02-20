import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface QueryParams{
  job?: string
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit{
  jobs: any [] = []
  apps: any [] = []
  queryParams?: QueryParams = {}
  
  constructor(private jobService:JobService, private router:Router, private toastr:ToastrService){}
  ngOnInit(): void {
      this.fetchJobs()
  }

  toggleRoles(job: any): void {
    job.showAllRoles = !job.showAllRoles;
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

  viewApplication(jobId: string){
    this.router.navigate(['applications'],{queryParams:{job:jobId}})
  }

  delete(jobId: string): void {
    this.jobService.deleteJobDetails(jobId).subscribe({
      next: (response : any) => {
        this.jobs = this.jobs.filter(job => job._id !== jobId);
        this.toastr.success('Job deleted successfully')
      },
      error: (error: any) => {
        console.log('Error deleting the job', error);
        this.toastr.error('Error deleting the job')
      }
    })
  }
}
