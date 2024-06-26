import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { AuthService } from '../../../Service/Patient/authservice.service';
import { MessageService } from 'primeng/api';
import { ViewDocument } from '../../../Model/Interface/Patient/view-document';
import { CheckboxModule } from 'primeng/checkbox';
import { DownloadRWF } from '../../../Model/Interface/Patient/download-rwf';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { Subscription } from 'rxjs';


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
    CheckboxModule,
    FormsModule,
    ConfirmDialogModule,
    FileUploadModule
  ],
  providers: [PatientBackendCallService, ConfirmationService],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent {
  @ViewChild('headerCheckBox') headerCheckBox: any;
  @ViewChildren('rowCheckBox') rowCheckBoxes!: QueryList<ElementRef>[];
  @ViewChild('fileUpload') fileUpload: any;
  uploadedFiles: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private patientBackendCallService: PatientBackendCallService,
    private authService: AuthService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,
    private http: HttpClient
  ) {

  }

  confirmationNumber?: string;
  patientName?: string;
  requestId: number = 0;
  documentList: ViewDocument[] = [];
  selectedDocuments!: any[];
  allChecked: boolean = false;

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.activatedRoute.params.subscribe((paramElem) => {
      this.requestId = paramElem['requestId'];
    })
    // const requestId = this.activatedRoute.snapshot.params['requestId'];
    this.patientBackendCallService.getViewDocument(this.requestId).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.isSuccess) {
          this.documentList = response.result.documentList;
          this.confirmationNumber = response.result.confirmationNumber;
          this.patientName = response.result.patientName;
          this.requestId = response.result.requestId;
          console.log(this.documentList)
        }
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', detail: error.toString(), life: 3000 });
      }
    })
  }

  onHeaderCheckBoxChange(event: any) {
    this.selectedDocuments = []
    // console.log(this.selectedDocuments) 
    if (event.checked) {
      for (var i = 0; i < this.documentList.length; i++) {
        this.selectedDocuments.push(this.documentList[i].requestWiseFileId)
      }
    } else {
      this.selectedDocuments = [];
    }
  }

  onRowCheckBoxChange(event: any, item: any) {
    if (this.documentList.length == this.selectedDocuments.length) {
      this.allChecked = true;
    }
    else {
      this.allChecked = false;
    }
  }
  patientFileUpload: FormData = new FormData();

  selectDocument(event: any) {
    console.log(this.fileUpload)
    for (let file of event.files) {
      console.log(file)
      this.uploadedFiles.push(file.name);
      this.patientFileUpload.append('uploadedDocumentList', file, file.name);
    }
  }

  uploadDocument() {
    this.patientFileUpload.append("requestId", this.requestId.toString());
    this.patientBackendCallService.uploadDocument(this.patientFileUpload).subscribe({
      next: (response) => {
        console.log(response);
        this.getDocuments();
        this.messageService.add({ severity: 'success', detail: "file uploaded", life: 3000 });
        this.clearDocument();
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', detail: error.toString(), life: 3000 });
      }
    })
  }

  clearDocument() {
    console.log(this.fileUpload)
    if (this.fileUpload && this.fileUpload.files) {
      this.fileUpload.clear();
    }
  }

  DownloadSingleDocument(item: any) {
    var downloadDocument: DownloadRWF = {
      RequestWiseFileId: [],
      isDownloadALl: false,
      requestId: this.requestId
    };
    downloadDocument.RequestWiseFileId.push(item.requestWiseFileId);
    downloadDocument.requestId = item.requestId;
    downloadDocument.isDownloadALl = false;

    this.DownloadBlob(downloadDocument);
  }

  DownloadAllDocument() {
    var downloadDocument: DownloadRWF = {
      RequestWiseFileId: [],
      isDownloadALl: false,
      requestId: this.requestId
    };
    if (this.selectedDocuments == undefined || this.selectedDocuments.length == 0) {
      downloadDocument.RequestWiseFileId = [];
      downloadDocument.isDownloadALl = true;
    }
    else {
      downloadDocument.RequestWiseFileId = this.selectedDocuments;
      downloadDocument.isDownloadALl = false;
    }
    this.DownloadBlob(downloadDocument);
  }

  DownloadBlob(downloadDocument:DownloadRWF){
    this.http.post('https://localhost:7001/api/Patient/DownloadDocuments', downloadDocument, {
      responseType: 'blob'
    }).subscribe(blob => {

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'DownloadedFiles.zip';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    });

  }

  DeleteDocument(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.patientBackendCallService.deleteDocument(item.requestWiseFileId).subscribe({
          next: (response) => {
            console.log(response);
            if (response.isSuccess) {
              this.patientBackendCallService.getViewDocument(this.requestId).subscribe({
                next: (response: any) => {
                  console.log(response);
                  if (response.isSuccess) {
                    this.documentList = response.result.documentList;
                    this.confirmationNumber = response.result.confirmationNumber;
                    this.patientName = response.result.patientName;
                    this.requestId = response.result.requestId;
                  }
                },
                error: (error: any) => {
                  this.messageService.add({ severity: 'error', detail: error.toString(), life: 3000 });
                }
              })
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            }
            else {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: response.error });
            }
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: error.toString() });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
