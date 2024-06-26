import { Component, ElementRef, NgModule, ViewChild, inject } from '@angular/core';
import { PatientLoginNavComponent } from '../patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../patient-login-footer/patient-login-footer.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { Observable, Subject, filter, from, fromEvent, map, of, BehaviorSubject } from 'rxjs';
import { ParametersService } from '../../../Service/Patient/parameters.service';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-site',
  standalone: true,
  imports: [
    PatientLoginNavComponent,
    PatientLoginFooterComponent,
    RouterLink,
    HttpClientModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './patient-site.component.html',
  styleUrl: './patient-site.component.scss'
})
export class PatientSiteComponent {

  parametersService: ParametersService = inject(ParametersService);

  newMadeObservable = new Observable((observable) => {
    observable.next(Math.random())
  })

  ngOnInit(): void {
    const newSubject = new Subject();
    const newSubjectBehavior = new BehaviorSubject<number>(100);

    this.newMadeObservable.subscribe({
      next: (data) => {
        console.log("data ", data);
      }
    })

    this.newMadeObservable.subscribe({
      next: (data) => {
        console.log("data ", data);
      }
    })
    
    newSubject.subscribe({
      next: (value) => {
        console.log("sub ",value)
      }
    })

    newSubject.subscribe({
      next: (value) => {
        console.log("sub ",value)
      }
    })
    
    newSubject.next(Math.random())

    newSubjectBehavior.subscribe({
      next: (value) => {
        console.log("subB ",value)
      }
    })

    newSubjectBehavior.next(3)
    
    newSubjectBehavior.subscribe({
      next: (value) => {
        console.log("subB ",value)
      }
    })
    
    newSubjectBehavior.next(2)
    
    this.newMadeObservable.subscribe({

    });

    this.getData();

    this.parametersService.CreateTask.subscribe((value) => {
      console.log("emitter ", value);
    })

    this.parametersService.CreateTaskSubject.subscribe((value) => {
      console.log("Subject ", value);
    })
  }

  serviceBtn() {
    this.parametersService.onCreateBtn(this.textValue);
    this.parametersService.onCreateBtnSubject(this.textValue);
  }
  textValue: string = "";

  @ViewChild('submitRequestTRV') submitRequestTRV!: ElementRef;

  createBtnObservable: any;

  // btnClicked(){
  //   this.createBtnObservable = fromEvent(this.submitRequestTRV.nativeElement, 'click')
  //   .subscribe({
  //     next: (val: any) => {
  //       console.log(val)
  //     },
  //     error: (error: any) => {
  //       console.log(error.message)
  //     },
  //     complete: () => {
  //       alert("complete fromEvent")
  //     }
  //   });
  // }

  // ngAfterViewInit(): void {
  //   this.btnClicked()
  // }

  // newObservable = new Observable((observer) => {
  //   observer.next("1")
  //   observer.next("1")
  //   observer.next("1")
  //   observer.error("error")
  //   observer.next("1")
  //   observer.complete();
  // });
  // newObservable = of("123",123,321,"321")

  // newObservable = from([1, 2, 3, 4, 5])
  newObservable = from([1, 2, 3, 4, 5]).pipe(map((val) => {
    return val * 5;
  }), filter((val, i) => {
    return val % 5 === 0;
  }))

  // transformData = this.newObservable.pipe(map((val) => {
  //   return val * 5;
  // }))

  // filterformData = this.newObservable.pipe(filter((val) => {
  //   return val % 5 == 0;
  // }))

  // filterMapformData = this.newObservable.pipe(map((val) => {
  //   return val * 5;
  // }), filter((val) => {
  //   return val % 5 == 0;
  // }))

  getData() {

    this.newObservable.subscribe({
      next: (val: any) => {
        console.log(val)
      },
      error: (error: any) => {
        console.log(error.message)
      },
      complete: () => {
        alert("complete")
      }
    }
    )

    // this.transformData.subscribe({
    //   next: (val: any) => {
    //     console.log(val)
    //   },
    //   error: (error: any) => {
    //     console.log(error.message)
    //   },
    //   complete: () => {
    //     alert("complete")
    //   }
    // }
    // )

    // this.filterformData.subscribe({
    //   next: (val: any) => {
    //     console.log(val)
    //   },
    //   error: (error: any) => {
    //     console.log(error.message)
    //   },
    //   complete: () => {
    //     alert("complete")
    //   }
    // }
    // )

    // this.filterMapformData.subscribe({
    //   next: (val: any) => {
    //     console.log(val)
    //   },
    //   error: (error: any) => {
    //     console.log(error.message)
    //   },
    //   complete: () => {
    //     alert("complete")
    //   }
    // }
    // )


  }




}
