import { Component } from '@angular/core';
import { PatientLoginNavComponent } from '../../Patient/patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../../Patient/patient-login-footer/patient-login-footer.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { emailValidator } from '../../../Validators/Email.validator';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { ValidateEmailDTO } from '../../../Model/Interface/Patient/validate-email-dto';

@Component({
  selector: 'app-patient-forgot-password',
  standalone: true,
  imports: [
    PatientLoginNavComponent, 
    PatientLoginFooterComponent, 
    RouterLink, 
    HttpClientModule,
    ReactiveFormsModule, 
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
  ],
  providers:[PatientBackendCallService],
  templateUrl: './patient-forgot-password.component.html',
  styleUrl: './patient-forgot-password.component.scss'
})
export class PatientForgotPasswordComponent {
  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private patientBackendCallService: PatientBackendCallService,
    private messageService: MessageService,
    private router: Router
  ){

  }

  forgetPasswordForm: FormGroup = this.formBuilder.group({
    Email: ['',Validators.required,[emailValidator]]
  })

  ForgetPasswordSubmit(){
    if(this.forgetPasswordForm.invalid){
      // this.messageService.add({summary:"", severity: 'success', detail: 'Mail has sent to you!', life: 3000 });
      // console.log("messageServide");
      this.forgetPasswordForm.markAllAsTouched();
      return;
    }

    const forgetPasswordDetails: ValidateEmailDTO = this.forgetPasswordForm.value;
    this.patientBackendCallService.forgetPassword(forgetPasswordDetails).subscribe((res:any)=>{
      debugger
      if(res.isSuccess){
        this.router.navigateByUrl("/patient/login")
      } 
      else if(!res.isSuccess){
        if(res.httpStatusCode == 404){
          this.messageService.add({ severity: 'error', detail: 'User Not Found!', life: 3000 });
        }
        else if(res.httpStatusCode == 400){
          this.messageService.add({ severity: 'error', detail: 'Something Went Wrong!', life: 3000 });
        }
      }
      else{
        this.messageService.add({ severity: 'error', detail: 'Internal Server Error!', life: 3000 });
      }
    })    
  }
}
