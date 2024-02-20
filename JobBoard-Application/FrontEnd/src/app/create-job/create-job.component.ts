import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent implements OnInit{

  title: string = ''
  skills: string = ''
  rolesAndResponsibilities: string = ''
  location: string = ''
  company: string = ''
  category: string = ''
  constructor(private jobService:JobService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {}

  create(): void {
    this.jobService.createJob(this.title, this.skills, this.rolesAndResponsibilities, this.location, this.company, this.category).subscribe({
      next: (response: any) => {
        console.log('Response', response);
        this.router.navigate(['/jobs'])
        this.toastr.success('Successfully created the job');
      },
      error: (error: any) => {
        console.log('Error creating the job', error);
        this.toastr.error('Error creating the job');
      }
    });
  }
  
}
