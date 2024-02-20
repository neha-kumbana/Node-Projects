import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatePassswordComponent } from './update-passsword/update-passsword.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { JobDetailsSeekerComponent } from './job-details-seeker/job-details-seeker.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { SearchJobComponent } from './search-job/search-job.component';
import { ProfileComponent } from './profile/profile.component';
import { JobsAppliedComponent } from './jobs-applied/jobs-applied.component';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { ApplicationsComponent } from './applications/applications.component';
import { RecentJobsComponent } from './recent-jobs/recent-jobs.component';

const routes: Routes = [
  {path: '', component:AllJobsComponent},
  {path: 'createJob', component:CreateJobComponent},
  {path: 'jobs', component:JobsComponent},
  {path: 'searchJobs', component:SearchJobComponent},
  {path: 'jobDetailsSeeker/:id', component:JobDetailsSeekerComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profile/:id', component:ProfileComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'updatePassword', component:UpdatePassswordComponent},
  {path: 'job-details/:id', component:JobDetailsComponent},
  {path: 'jobsApplied', component:JobsAppliedComponent},
  {path: 'savedJobs', component:SavedJobComponent},
  {path: 'applications', component:ApplicationsComponent},
  {path: 'recentJobs', component:RecentJobsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
