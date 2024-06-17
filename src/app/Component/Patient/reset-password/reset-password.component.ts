import { Component } from '@angular/core';
import { PatientLoginNavComponent } from '../../Patient/patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../../Patient/patient-login-footer/patient-login-footer.component';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { passwordMatchingValidatior, passwordValidator } from '../../../Validators/Password.validator';
import { emailValidator } from '../../../Validators/Email.validator';
import { LoginDTO } from '../../../Model/Interface/Login/login-dto';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    PatientLoginNavComponent,
    PatientLoginFooterComponent,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
  ],
  providers: [PatientBackendCallService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  constructor(
    private formBuilder: FormBuilder,
    private patientBackendCallService: PatientBackendCallService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  email: string = "";
  ResetPasswordForm: FormGroup = this.formBuilder.group({
    Email: [, [Validators.required], [emailValidator]],
    Password: ['', [Validators.required], [passwordValidator]],
    ConfirmPassword: ['', [Validators.required], []],
  }, {
    validators: this.ConfirmPasswordValidator
  })

  ngOnInit(): void {
    //logic to check password Reset Table
    //  we can say guard
    const token = this.activatedRoute.snapshot.queryParams['token'];
    this.patientBackendCallService.resetPasswordValidate(token).subscribe((res: any) => {
      if (res.isSuccess) {
        this.email = res.result.email;
        console.log("res ", res);
        console.log("email ", this.email);

        this.ResetPasswordForm.get("Email")?.setValue(this.email);
        this.ResetPasswordForm.get("Email")?.disable();
        this.messageService.add({ severity: 'success', detail: 'Please Enter your Password!', life: 3000 });
      }
      else if (!res.isSuccess) {
        if (res.httpStatusCode == 404) {
          this.messageService.add({ severity: 'error', detail: 'User does not Exists!', life: 3000 });
        }
        else if (res.httpStatusCode == 400) {
          this.messageService.add({ severity: 'error', detail: res.error, life: 3000 });
          this.router.navigateByUrl('/patient/forgetpassword');
        }
      }
      else {
        this.messageService.add({ severity: 'error', detail: 'Internal Server Error!', life: 3000 });
      }
    })

  }

  ConfirmPasswordValidator(control: AbstractControl) {
    let a = control.get('Password')
    let b = control.get('ConfirmPassword')
    return (a != null && control.get('Password')?.value === control.get('ConfirmPassword')?.value) ? null : { PasswordMismatch: true }
  }

  ResetPasswordSubmit() {
    console.log(this.ResetPasswordForm?.valid)
    console.log(this.ResetPasswordForm?.value)
    this.ResetPasswordForm?.markAllAsTouched();
    this.ResetPasswordForm.get("Email")?.setValue(this.email);
    this.ResetPasswordForm.get("Email")?.enable();
    const resetPassword: LoginDTO = this.ResetPasswordForm?.value;
    console.log(resetPassword)
    this.patientBackendCallService.resetPassword(resetPassword).subscribe((res: any) => {
      if (res.isSuccess) {
        this.messageService.add({ severity: 'success', detail: 'Password Reset Successfull!', life: 3000 });
        this.router.navigateByUrl('/patient/login');
      }
      else if (!res.isSuccess) {
        this.messageService.add({ severity: 'error', detail: 'Unexpected Error!', life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', detail: 'Internal Server Error!', life: 3000 });
      }
    })
  }
}
