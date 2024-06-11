import {
  CanActivateFn, Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { inject } from '@angular/core';

export const publicRouteGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  // let isLoggedInUser = localStorage.getItem("token");
  if (typeof window !== 'undefined' && localStorage.getItem("token") == null) {
    //here the logic of the which login page it should be redirected!
    _router.navigate(['patient/login']);
    return false;
  }
  return true;
};
