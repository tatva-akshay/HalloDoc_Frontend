import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import {SubmitrequestFooterComponent} from '../submitrequest-footer/submitrequest-footer.component'

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [SubmitrequestFooterComponent, DashboardHeaderComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {

}
