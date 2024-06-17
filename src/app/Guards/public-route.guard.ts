import {
  CanActivateFn, Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Inject, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export const publicRouteGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  // const messageService = inject(MessageService);
  // let isLoggedInUser = localStorage.getItem("token");
  if (typeof window !== 'undefined' && localStorage.getItem("token") == null) {
    //here the logic of the which login page it should be redirected!
    // messageService.add({ severity: 'error', summary: 'Un Authorized Access!' });
    _router.navigate(['patient/login']);
    return false;
  }
  return true;
};
