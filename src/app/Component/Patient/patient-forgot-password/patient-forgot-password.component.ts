import { Component } from '@angular/core';
import { PatientLoginNavComponent } from '../../Patient/patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../../Patient/patient-login-footer/patient-login-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-forgot-password',
  standalone: true,
  imports: [PatientLoginNavComponent, PatientLoginFooterComponent, RouterLink],
  templateUrl: './patient-forgot-password.component.html',
  styleUrl: './patient-forgot-password.component.scss'
})
export class PatientForgotPasswordComponent {
  constructor(){

  }

  
}
