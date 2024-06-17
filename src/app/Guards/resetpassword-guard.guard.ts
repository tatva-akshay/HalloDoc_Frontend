import { inject } from '@angular/core';
import {CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const resetpasswordGuardGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  // const messageService = inject(MessageService);
  const token = route.queryParams['token'];
  if(token == null){
    // messageService.add({severity : "error", summary:"Invalid Link!"});
    _router.navigateByUrl("/patient/forgetpassword");
    return false;
  }

  return true;
};

