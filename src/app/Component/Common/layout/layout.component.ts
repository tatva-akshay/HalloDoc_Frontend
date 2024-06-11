import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientLoginComponent } from '../../Patient/patient-login/patient-login.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, PatientLoginComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
