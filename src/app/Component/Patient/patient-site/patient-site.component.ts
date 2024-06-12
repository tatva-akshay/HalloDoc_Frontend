import { Component } from '@angular/core';
import { PatientLoginNavComponent } from '../patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../patient-login-footer/patient-login-footer.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patient-site',
  standalone: true,
  imports: [PatientLoginNavComponent ,PatientLoginFooterComponent, RouterLink, HttpClientModule],
  templateUrl: './patient-site.component.html',
  styleUrl: './patient-site.component.scss'
})
export class PatientSiteComponent {

}
