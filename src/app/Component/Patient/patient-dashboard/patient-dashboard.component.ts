import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component'
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';

import { MessageService } from 'primeng/api';
import { ValidateEmailDTO } from '../../../Model/Interface/Patient/validate-email-dto';
import { error } from 'console';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    SubmitrequestFooterComponent,
    DashboardHeaderComponent,
    ToastModule,
    MessagesModule
  ],
  providers: [PatientBackendCallService],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {
 
  constructor(
    private messageService: MessageService,
    private patientBackendCallService: PatientBackendCallService
  ) {

  }

  ngOnInit(): void {
    debugger
    const userEmailDTO: ValidateEmailDTO = {
      email: localStorage.getItem('email')!
    };
    this.patientBackendCallService.getDashboardContent(userEmailDTO).subscribe({
      next: (response: any) => {
        console.log(response)
      }, error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.toString() });
      }
    });
  }

}
