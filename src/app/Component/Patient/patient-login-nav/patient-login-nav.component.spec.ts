import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLoginNavComponent } from './patient-login-nav.component';

describe('PatientLoginNavComponent', () => {
  let component: PatientLoginNavComponent;
  let fixture: ComponentFixture<PatientLoginNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientLoginNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientLoginNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
