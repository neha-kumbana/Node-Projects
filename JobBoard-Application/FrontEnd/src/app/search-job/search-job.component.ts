import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-job',
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css'
})
export class SearchJobComponent implements OnInit{

  jobId!: string;
  job: any;
  showApplication: boolean = false

  application: any

  education: string = ''
  experience: string = ''
  skills: string = ''
  contactDetails: string = ''
  resume: File | null = null

  title: string = ''
  location: string = ''
  company: string = ''
  rolesAndResponsibilities: string = ''

  selectedJob: any;
  selectedJobId: string | undefined;

  constructor(private jobService:JobService, private route:ActivatedRoute, private router:Router, private toastr:ToastrService, private applicationService:ApplicationService){ 

  }

  jobs: any [] = []
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const { skills, title, company, location, category } = params;
      this.jobService.getJobSearch(skills, title, company, location, category).subscribe({
        next: (response: any) => {
          this.jobs = response.jobs;
          console.log('Search results:', this.jobs);
        },
        error: (error: any) => {
          console.error('Error fetching search results:', error);
        }
      });
    });
  }

  apply(job: any){
    this.selectedJob = job
    this.selectedJobId = job._id
    console.log(job._id);
    this.showApplication = true
  }

  handleFileInput(event: any): void {
    const file:File = event.target.files[0];
    this.resume = file
  }

  applyJob(){
    if (!this.resume) {
      console.error('Resume file is not selected.');
      return;
    }
    if (this.selectedJobId){
      console.log('Selected Job ID:', this.selectedJobId);
      this.applicationService.createApplication(this.selectedJobId, this.education, this.experience, this.skills, this.resume, this.contactDetails).subscribe({
        next: (response: any) => {
          console.log("Response", response);
          this.router.navigate(['']);
          this.toastr.success('Job applied successfully');
        },
        error: (error: any) => {
          console.log('An error occurred', error);
          this.toastr.error('Something went wrong');
        }
      }); 
    }
    }
    
    saveJob(job: any){
      const jobId = job._id      
      this.applicationService.saveJob(jobId, job.title, job.company, job.skills, job.location, job.rolesAndResponsibilities).subscribe({
        next: (response: any) => {
          console.log("Response:", response);
          this.router.navigate([''])
          this.toastr.success('Job saved successfully')
          
        },
        error: (error: any) => {
          console.log("An error occured", error);
          this.toastr.error('Something went wrong')
        }
      })
    }
}
