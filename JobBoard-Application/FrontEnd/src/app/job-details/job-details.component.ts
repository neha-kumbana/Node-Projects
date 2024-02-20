import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../service/job.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit{
  jobId!: string;
  job: any;
  updatedJob: any = {};

  constructor(private route: ActivatedRoute, private jobService: JobService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id')!;
      if (this.jobId) {
        this.fetchJobDetails();
      } else {
        console.log('No job ID found in parameters.');
      }
    });
  }

  fetchJobDetails(): void {
    this.jobService.getJob(this.jobId).subscribe({
      next: (response: any) => {
        this.job = response.job;
        this.updatedJob = { ...this.job };
      },
      error: (error: any) => {
        console.log('Error fetching job details:', error);
      }
    });
  }

  update(jobId: string): void {
    console.log('Data being sent to the server:', this.updatedJob);
    const updateJob = {
      title: this.updatedJob.title,
      skills: this.updatedJob.skills,
      rolesAndResponsibilities: this.updatedJob.rolesAndResponsibilities,
      location: this.updatedJob.location,
      company: this.updatedJob.company,
      category: this.updatedJob.category
    }
    this.jobService.updateJobDetails(jobId, updateJob).subscribe({
      next: (response: any) => {
        this.router.navigate(['/jobs'])
        this.toastr.success('Job updated successfully');
      },
      error: (error: any) => {
        console.log('Error updating job', error);
        this.toastr.error('Error updating the job');
      }
    });
  }
}
