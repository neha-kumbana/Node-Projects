import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassswordComponent } from './update-passsword.component';

describe('UpdatePassswordComponent', () => {
  let component: UpdatePassswordComponent;
  let fixture: ComponentFixture<UpdatePassswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePassswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePassswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
