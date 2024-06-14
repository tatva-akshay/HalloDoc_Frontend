import { Injectable } from '@angular/core';
import { loadavg } from 'os';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(

  ) {

   }

  RequestButton : number = 2;

  getRequestButton(){
    return window && window.localStorage.getItem("requestType");
  }

  setRequestButton(value: number){
    window.localStorage.setItem("requestType",value.toString());
    this.RequestButton = value;
  }
}
