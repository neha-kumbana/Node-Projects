import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSeekerComponent } from './jobs-seeker.component';

describe('JobsSeekerComponent', () => {
  let component: JobsSeekerComponent;
  let fixture: ComponentFixture<JobsSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsSeekerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
