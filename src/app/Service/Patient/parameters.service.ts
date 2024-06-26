import { Injectable, EventEmitter } from '@angular/core';
import { loadavg } from 'os';
import { Subject } from 'rxjs';

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

  //special type of observable
  CreateTaskSubject = new Subject<string>();
  onCreateBtnSubject(value: string){
    this.CreateTaskSubject.next(value);
  }

  CreateTask : EventEmitter<string> = new EventEmitter<string>();
  onCreateBtn(value: string){
    this.CreateTask.emit(value);
  }
}
