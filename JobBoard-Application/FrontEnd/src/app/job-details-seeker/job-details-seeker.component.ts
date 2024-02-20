import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../service/job.service';
import { ApplicationService } from '../service/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-details-seeker',
  templateUrl: './job-details-seeker.component.html',
  styleUrl: './job-details-seeker.component.css'
})
export class JobDetailsSeekerComponent {
  jobId!: string;
  job: any;
  showApplication: boolean = false
  application: any

  education: string = ''
  experience: string = ''
  skills: string = ''
  contactDetails: string = ''
  resume: File | null = null;

  title: string = ''
  location: string = ''
  company: string = ''
  rolesAndResponsibilities: string = ''

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private jobService: JobService, private applicationService: ApplicationService) {
    this.route.paramMap.subscribe(params => {
      const jobId = params.get('id');
      this.applicationService.setJobId(jobId);
    });
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id')!;
      console.log("Job Id:", this.jobId);
      
      if (this.jobId) {
        this.fetchJobDetails();
      } else {
        console.log('No job ID found in parameters.');
        // Handle the case where no job ID is found
      }
    });

    this.route.data.subscribe(data => {
      this.job = data['job']; 
    });
 
  }

  fetchJobDetails(): void {
    this.jobService.getJobDetails(this.jobId).subscribe({
      next: (response: any) => {
        this.job = response.job;  
        this.title = this.job.title;
        this.skills = this.job.skills
        this.company = this.job.company
        this.location = this.job.location
        this.rolesAndResponsibilities = this.job.rolesAndResponsibilities      
      },
      error: (error: any) => {
        console.log('Error fetching job details:', error);
        // Handle error, show error message, etc.
      }
    });
  }

  showApplicationForm(){
    this.showApplication = true
  }

handleFileInput(event: any): void {
  const file:File = event.target.files[0];
  this.resume = file
}

  applyJob(resume: File | null): void {
    if (!resume) {
      console.error('Resume file is not selected.');
      return;
    }
    this.applicationService.createApplication(this.jobId, this.education, this.experience, this.skills, resume, this.contactDetails).subscribe({
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

  saveJob(){
    this.applicationService.saveJob(this.jobId, this.title, this.skills, this.company, this.location, this.rolesAndResponsibilities).subscribe({
      next: (response: any) => {
        this.router.navigate([''])
        console.log("Response:", response);
        this.toastr.success('Job saved successfully')
      },
      error: (error: any) => {
        console.log("An error occured", error);
        this.toastr.error('Something went wrong')
      }
    })
  }
}
