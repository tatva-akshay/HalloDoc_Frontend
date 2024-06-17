import { Component } from '@angular/core';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-patientprofile',
  standalone: true,
  imports: [
    SubmitrequestFooterComponent,
    DashboardHeaderComponent,
    ToastModule,
    MessagesModule
  ],
  templateUrl: './patientprofile.component.html',
  styleUrl: './patientprofile.component.scss'
})
export class PatientprofileComponent {

}
