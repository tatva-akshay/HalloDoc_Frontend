import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {

   }
   
   getUserEmail(){
    return window && window.localStorage.getItem("email");
   }

   setUserEmail(email: string){
    return window && window.localStorage.setItem("email",email);
   }

   getUserToken(){
    return window && window.localStorage.getItem("token");
   }

   setUserToken(token: string){
    return window && window.localStorage.setItem("token",token);
   }
}
