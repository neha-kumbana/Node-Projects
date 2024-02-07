import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatePassswordComponent } from './update-passsword/update-passsword.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { JobDetailsSeekerComponent } from './job-details-seeker/job-details-seeker.component';

const routes: Routes = [
  {path: '', component:AllJobsComponent},
  {path: 'jobs', component:JobsComponent},
  {path: 'jobDetailsSeeker/:id', component:JobDetailsSeekerComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'updatePassword', component:UpdatePassswordComponent},
  {path: 'job-details/:id', component:JobDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
