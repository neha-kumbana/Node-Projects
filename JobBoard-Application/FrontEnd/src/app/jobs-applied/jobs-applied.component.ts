import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { forkJoin } from 'rxjs';

interface Application {
  _id: string;
  education: string;
  experience: string;
  skills: string;
  contactDetails: string;
  job: string;
}

interface SavedJob {
  _id: string;
  title: string;
  skills: string;
  rolesAndResponsibilities: string;
  location: string;
  company: string;
  job: string;
}

@Component({
  selector: 'app-jobs-applied',
  templateUrl: './jobs-applied.component.html',
  styleUrl: './jobs-applied.component.css'
})
export class JobsAppliedComponent implements OnInit {

  jobIds: string[] = [];
  jobId!: string;
  jobs: any;
  saves: SavedJob[] = [];

  constructor(private jobService: JobService, private route:ActivatedRoute, private applicationService: ApplicationService, private router: Router){}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const jobIdsString = params['jobId'];
        this.jobIds = jobIdsString.split(',');
        if(jobIdsString){
          this.fetchAll()
        }
        else{
          console.log('No job id to be fetched');
          
        }
      })
  }

  fetchAll(){
    this.jobs = []
    this.jobIds.forEach(jobId => {
      this.jobService.getJobDetails(jobId).subscribe({
        next: (response: any) => {
          this.jobs.push(response.job);
          console.log("Response", response);
          
        },
        error: (error: any) => {
          console.log("An error occured", error);
          
        }
      })
    })
    
  }

  getMyJobs(){
    this.applicationService.getJobs().subscribe({
      next: (response: any) => {
        console.log("Response: ", response);
        const jobIds = response.apps.map((app:Application) => app.job)
        console.log("Job:", jobIds);
        const observable = jobIds.map((jobId: string) => this.jobService.getJobDetails(jobId))
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

  getSavedJobs(){
    this.applicationService.getSavedJobs().subscribe({
      next: (response: any) => {
        console.log("Response", response);
        this.saves = response.saves
        this.router.navigate(['savedJobs'])
      },
      error: (error: any) => {
        console.log("An error occured", error);
        
      }
    })
  }
}
