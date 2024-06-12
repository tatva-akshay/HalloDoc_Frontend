import { TestBed } from '@angular/core/testing';

import { PatientBackendCallService } from './patient-backend-call.service';

describe('PatientBackendCallService', () => {
  let service: PatientBackendCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientBackendCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
