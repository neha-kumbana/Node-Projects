import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../service/job.service';

@Component({
  selector: 'app-job-details-seeker',
  templateUrl: './job-details-seeker.component.html',
  styleUrl: './job-details-seeker.component.css'
})
export class JobDetailsSeekerComponent {
  jobId!: string;
  job: any;

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id')!;
      if (this.jobId) {
        this.fetchJobDetails();
      } else {
        console.log('No job ID found in parameters.');
        // Handle the case where no job ID is found
      }
    });
  }

  fetchJobDetails(): void {
    this.jobService.getJobDetails(this.jobId).subscribe({
      next: (response: any) => {
        this.job = response.job;
      },
      error: (error: any) => {
        console.log('Error fetching job details:', error);
        // Handle error, show error message, etc.
      }
    });
  }
}
