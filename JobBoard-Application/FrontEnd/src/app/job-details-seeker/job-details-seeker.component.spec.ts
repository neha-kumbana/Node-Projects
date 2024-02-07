import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsSeekerComponent } from './job-details-seeker.component';

describe('JobDetailsSeekerComponent', () => {
  let component: JobDetailsSeekerComponent;
  let fixture: ComponentFixture<JobDetailsSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailsSeekerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailsSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
