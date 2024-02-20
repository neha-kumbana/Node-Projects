import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { ToastrService } from 'ngx-toastr';

export interface Application {
  _id: string;
  education: string;
  experience: string;
  skills: string;
  resume: string;
  contactDetails: string;
  job: string;
  user: {
    _id: string;
    username: string;
    email: string;
  }
  createdAt: string;
}

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit{

  jobId!: string
  appId!: string
  apps: Application [] = []
  
  constructor(private jobService:JobService, private router:Router, private route:ActivatedRoute, private applicationService:ApplicationService, private toastr:ToastrService){ }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const {job} = params   
      console.log(job);
      this.jobService.getApplications(job).subscribe({
        next: (response: any) => {
          this.apps = response.apps
          console.log("Response", response);
          
        },error:(error: any) => {
          console.log("An error occured", error);
          
        }
      })
    });
  }

  convertUTCtoIST(utcDateString: string): string {
    const utcDate = new Date(utcDateString);
    // Get the UTC time in milliseconds
    const utcTime = utcDate.getTime();
    // Get IST offset in milliseconds (UTC +5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    // Calculate IST time
    const istTime = utcTime + istOffset;
    // Create a new Date object with IST time
    const istDate = new Date(istTime);
    // Return the IST date string
    return istDate.toDateString();
  }

  downloadResume(resumeUrl: string): void {
    const baseUrl = 'http://localhost:3000/'; 
    const resumeFileUrl = baseUrl + resumeUrl;
    window.open(resumeFileUrl, '_blank');
  }

  showNoApplication(){
    this.toastr.error("No applicants...")
  }
}
