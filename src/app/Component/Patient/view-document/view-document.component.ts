import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { AuthService } from '../../../Service/Patient/authservice.service';
import { MessageService } from 'primeng/api';
import { ViewDocument } from '../../../Model/Interface/Patient/view-document';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [
    SubmitrequestFooterComponent,
    DashboardHeaderComponent,
    ToastModule,
    MessagesModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    CheckboxModule
  ],
  providers:[PatientBackendCallService],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent {
  constructor(
    private formBuilder: FormBuilder,
    private patientBackendCallService: PatientBackendCallService,
    private authService: AuthService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  confirmationNumber?: string;
  patientName?: string;
  documentList: ViewDocument[] = [];
  ngOnInit(): void {
      const requestId = this.activatedRoute.snapshot.queryParams['requestId'];
      console.log("requestId",requestId);
      this.patientBackendCallService.getViewDocument(requestId).subscribe({
        next:(response:any)=>{
          console.log(response);
          if(response.isSuccess){
            this.documentList = response.result.documentList;
            this.confirmationNumber = response.result.confirmationNumber;
            this.patientName = response.result.patientName;
            console.log(this.documentList)
          }
        },
        error:(error:any)=>{
          this.messageService.add({ severity: 'error', detail: error.toString(), life: 3000 });
        }
      })
  }
  UploadDocument():any;
  UploadDocument(){
    console.log("UploadViewDocument")
  }
}
