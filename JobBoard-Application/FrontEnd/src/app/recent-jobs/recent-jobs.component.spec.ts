import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentJobsComponent } from './recent-jobs.component';

describe('RecentJobsComponent', () => {
  let component: RecentJobsComponent;
  let fixture: ComponentFixture<RecentJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
