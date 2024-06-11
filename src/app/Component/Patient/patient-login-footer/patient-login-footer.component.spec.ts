import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLoginFooterComponent } from './patient-login-footer.component';

describe('PatientLoginFooterComponent', () => {
  let component: PatientLoginFooterComponent;
  let fixture: ComponentFixture<PatientLoginFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientLoginFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientLoginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
