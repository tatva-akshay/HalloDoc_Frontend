import { Component } from '@angular/core';
import { PatientLoginNavComponent } from '../../Patient/patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../../Patient/patient-login-footer/patient-login-footer.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../Validators/Email.validator';

@Component({
  selector: 'app-patient-forgot-password',
  standalone: true,
  imports: [PatientLoginNavComponent, PatientLoginFooterComponent, RouterLink],
  templateUrl: './patient-forgot-password.component.html',
  styleUrl: './patient-forgot-password.component.scss'
})
export class PatientForgotPasswordComponent {
  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder
  ){

  }

  forgetPasswordForm: FormGroup = this.formBuilder.group({
    Email: ['',Validators.required,[emailValidator]]
  })

  
}
