import { Component } from '@angular/core';
import { DarkModeService } from '../../../Service/dark-mode.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-patient-login-nav',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './patient-login-nav.component.html',
  styleUrl: './patient-login-nav.component.scss'
})
export class PatientLoginNavComponent {
  constructor(private darkModeService: DarkModeService){

  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
