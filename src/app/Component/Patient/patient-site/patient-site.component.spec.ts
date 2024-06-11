import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSiteComponent } from './patient-site.component';

describe('PatientSiteComponent', () => {
  let component: PatientSiteComponent;
  let fixture: ComponentFixture<PatientSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
