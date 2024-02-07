import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.css'
})
export class AllJobsComponent implements OnInit {
  jobs: any[] = []
  constructor(private jobSerivce:JobService, private authService:AuthService, private toastr:ToastrService, private router:Router){}
  ngOnInit(): void {
    this.fetchJobs()
  }

  fetchJobs(): void{
    const role = this.authService.getUserRole()
    console.log(role);
    
    if( role == 'Employer'){
      this.jobSerivce.getAllJobs().subscribe({
        next:(response:any) => {
          this.jobs = response.jobs
        },
        error: (error:any) => {
          console.log('Error while fecthing jobs', error);
          
        }
      })
    }else{
      this.jobSerivce.getPublicJobs().subscribe({
        next:(response:any) => {
          this.jobs = response.jobs
        },
        error: (error: any) => {
          console.log('Error fetching jobs', error);
          
        }
      })
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


}
