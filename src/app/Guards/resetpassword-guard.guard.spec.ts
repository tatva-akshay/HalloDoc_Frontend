import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { resetpasswordGuardGuard } from './resetpassword-guard.guard';

describe('resetpasswordGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => resetpasswordGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
