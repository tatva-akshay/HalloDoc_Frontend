// import { HttpInterceptorFn } from '@angular/common/http';
// import { Inject } from '@angular/core';
// import { AuthService } from '../Service/Patient/authservice.service';

// export const myInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   debugger
//   const authService = Inject(AuthService);
//   // const token = authService.getUserToken();
//   const token = localStorage.getItem("token");

//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return next(authReq);
// };

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../Service/Patient/authservice.service";
import { Observable } from "rxjs";
@Injectable()
export class myInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getUserToken();

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    } else {
      // Handle the case where token is not available or not needed
      return next.handle(req);
    }
  }
}