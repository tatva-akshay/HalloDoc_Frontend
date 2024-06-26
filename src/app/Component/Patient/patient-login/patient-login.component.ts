import { Component, ElementRef, Input, SimpleChanges } from '@angular/core';
import { PatientLoginNavComponent } from '../../Patient/patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../../Patient/patient-login-footer/patient-login-footer.component';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginDTO } from '../../../Model/Interface/Login/login-dto';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { emailValidator } from '../../../Validators/Email.validator';
import { passwordValidator } from '../../../Validators/Password.validator';
import { CommonModule } from '@angular/common';

import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
// import { BrowserModule } from '@angular/platform-browser';
// import { provideAnimations  } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [
    PatientLoginNavComponent,
    PatientLoginFooterComponent,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    MessagesModule,
    ToastModule,
    ButtonModule
  ],
  providers: [PatientBackendCallService],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss'
})
export class PatientLoginComponent {
  @Input() data :string = "not";

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private patientBackendCallService: PatientBackendCallService
  ) {

  }

  loginForm: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required], [emailValidator]],
    Password: ['', [Validators.required], []]
    // Password: ['',Validators.required,passwordValidator]
  });

  // visiblitypassword() {
  //   const passwordInput = this.elementRef.nativeElement.querySelector('#passwordshow');
  //   if (passwordInput.type === 'text') {
  //     passwordInput.type = 'password';
  //     this.elementRef.nativeElement.querySelector('#hidepassword').style.display = 'block';
  //   } else {
  //     passwordInput.type = 'text';
  //     this.elementRef.nativeElement.querySelector('#hidepassword').style.display = 'none';
  //   }
  //   console.log(this.loginForm.invalid);
  // }

  loginSubmit() {
    // debugger
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const loginUserDetails: LoginDTO = this.loginForm.value;

    this.patientBackendCallService.login(loginUserDetails).subscribe((res: any) => {
      if (!res.isSuccess) {
        if (res.httpStatusCode == 404) {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'User Not Found!', life: 3000 });
        }
        else if (res.httpStatusCode == 403) {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid Password!' });
        }
        else if (res.httpStatusCode == 400) {
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Reset your Password/Create Account!' });
        }
      }
      else if (res.isSuccess) {
        if (res.result.role == "3") {
          localStorage.setItem("token", res.result.token);
          localStorage.setItem("email", res.result.email);
          this.messageService.add({ severity: 'success', summary: 'Login Successful', detail: 'You have been logged in successfully.' });
          this.router.navigateByUrl("patient/dashboard");
        }else{
          this.messageService.add({ severity: 'error', summary: 'UnAuthorize', detail: 'Access Forbidden!' });
        }

      }
      else {
        alert("Internal error!")
      }

    });



  }

}
