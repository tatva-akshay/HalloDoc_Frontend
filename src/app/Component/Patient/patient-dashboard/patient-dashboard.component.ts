import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component'
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';

import { MessageService } from 'primeng/api';
import { ValidateEmailDTO } from '../../../Model/Interface/Patient/validate-email-dto';
import { error } from 'console';
import { Dashboardtable } from '../../../Model/Interface/Patient/dashboardtable';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from "primeng/dialog";


@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    SubmitrequestFooterComponent,
    DashboardHeaderComponent,
    ToastModule,
    MessagesModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [PatientBackendCallService],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {

  constructor(
    private messageService: MessageService,
    private patientBackendCallService: PatientBackendCallService,
    private confirmationService: ConfirmationService
  ) {

  }
  dashboardtableContent: Dashboardtable[] = [];
  newRequest: boolean = false;
  forMeRequest: boolean = false;
  someoneElseRequest: boolean = false;

  newRequestFunction() {
    this.newRequest = true;
  }
  ngOnInit(): void {
    // debugger
    const userEmailDTO: ValidateEmailDTO = {
      email: localStorage.getItem('email')!
    };
    this.patientBackendCallService.getDashboardContent(userEmailDTO).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dashboardtableContent = response.result;
        console.log(this.dashboardtableContent)

      }, error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.toString() });
      }
    });
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Enter Details' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Cancelled', life: 3000 });
      }
    });
  }

  submitRequest(){
    if(this.forMeRequest){
      
    }
    else{

    }
  }
}
