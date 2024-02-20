import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'
import { HeaderComponent } from './components/partials/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatePassswordComponent } from './update-passsword/update-passsword.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { JobDetailsSeekerComponent } from './job-details-seeker/job-details-seeker.component';
import { JobsSeekerComponent } from './jobs-seeker/jobs-seeker.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { SearchJobComponent } from './search-job/search-job.component';
import { ProfileComponent } from './profile/profile.component';
import { JobsAppliedComponent } from './jobs-applied/jobs-applied.component';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { ApplicationsComponent } from './applications/applications.component';
import { RecentJobsComponent } from './recent-jobs/recent-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UpdatePassswordComponent,
    JobsComponent,
    JobDetailsComponent,
    AllJobsComponent,
    JobDetailsSeekerComponent,
    JobsSeekerComponent,
    CreateJobComponent,
    SearchJobComponent,
    ProfileComponent,
    JobsAppliedComponent,
    SavedJobComponent,
    ApplicationsComponent,
    RecentJobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
