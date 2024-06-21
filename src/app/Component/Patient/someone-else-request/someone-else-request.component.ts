import { CommonModule, formatDate } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../Service/Patient/authservice.service';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { futureDateValidator, ageRangeValidator } from '../../../Validators/Bdate.validator';
import { emailValidator } from '../../../Validators/Email.validator';
import { RegionDropDown } from '../../../Model/Interface/Common/region-drop-down';
import { OtherRequestDTO } from '../../../Model/Interface/Patient/other-request-dto';
import { request } from 'http';

@Component({
  selector: 'app-someone-else-request',
  standalone: true,
  imports: [
    DashboardHeaderComponent,
    SubmitrequestFooterComponent,
    ReactiveFormsModule,
    CalendarModule,
    HttpClientModule,
    CommonModule,
    FileUploadModule,
    ToastModule,
    RouterLink,
    MessagesModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule
  ],
  providers: [PatientBackendCallService],
  templateUrl: './someone-else-request.component.html',
  styleUrl: './someone-else-request.component.scss',
})
export class SomeoneElseRequestComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private patientBackendCallService: PatientBackendCallService,
    private authService: AuthService
  ) {

  }
  regionList: RegionDropDown[] = [];
  uploadedFiles: File[] = [];
  ngOnInit(): void {
    this.patientBackendCallService.getAllRegion().subscribe((res: any) => {
      if (!res.isSuccess) {
        alert("not found")
      }
      else if (res.isSuccess) {
        this.regionList = res.result;

        console.log(this.regionList)
        console.log(res);
      }
      else {
        alert("Internal error!")
      }
    });
  }

  someoneElseRequest: FormGroup = this.formBuilder.group({
    YFirstName: [],
    RelationName: ['', [], []],
    Symptoms: [],
    FirstName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    LastName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    Bdate: ['', [Validators.required], [futureDateValidator, ageRangeValidator(18, 50)]],
    Email: ['', [Validators.required], [emailValidator]],
    Mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    Street: ['', [Validators.required]],
    City: ['', [Validators.required]],
    Zipcode: ['', [Validators.required]],
    regionId: [null, [Validators.required]],
    Room: ['', [Validators.maxLength(20)], []],
    RequestType: [2, [], []]
    // Files: [[]],
  });

  requestDataForm: FormData = new FormData();

  uploadDocument(event: any) {
    for (let file of event.files) {
      console.log(file)
      this.uploadedFiles.push(file.name);
      this.requestDataForm.append('File', file, file.name);
    }
  }

  RequestSubmit() {

    this.someoneElseRequest.markAllAsTouched();
    if (this.someoneElseRequest.invalid) {
      return;
    }
    const requestorEmail = this.authService.getUserEmail() ?? "Requestor";

    const otherRequestData: OtherRequestDTO = this.someoneElseRequest.value;
    console.log(otherRequestData)
    debugger
    this.requestDataForm.append("RelationName",otherRequestData?.RelationName)
    this.requestDataForm.append("Symptoms",otherRequestData?.Symptoms)
    this.requestDataForm.append("FirstName",otherRequestData?.FirstName)
    this.requestDataForm.append("LastName",otherRequestData?.LastName)
    this.requestDataForm.append("Bdate",formatDate(otherRequestData?.Bdate, 'yyyy-MM-ddTHH:mm:ss', 'en-US'))
    this.requestDataForm.append("Email",otherRequestData?.Email)
    this.requestDataForm.append("Mobile",otherRequestData?.Mobile)
    this.requestDataForm.append("Street",otherRequestData?.Street)
    this.requestDataForm.append("City",otherRequestData?.City)
    this.requestDataForm.append("Zipcode",this.someoneElseRequest.get("Zipcode")?.value.toString())
    this.requestDataForm.append("regionId",otherRequestData?.regionId.toString())
    this.requestDataForm.append("YFirstName",requestorEmail?.toString())

    this.patientBackendCallService.someoneElseRequest(this.requestDataForm).subscribe((res: any) => {
      if (!res.isSuccess) {
        if (res.httpStatusCode == 400) {
          this.messageService.add({ severity: 'error', detail: res.error.toString(), life: 3000 });
        }
      }
      else if (res.isSuccess) {
        this.messageService.add({ severity: 'success', detail: 'Request Created!', life: 3000 });
        this.router.navigateByUrl("/patient/dashboard")
      }
      else {
        this.messageService.add({ severity: 'error', detail: 'Internal error!', life: 3000 });
      }
    })
    console.log(this.someoneElseRequest.valid);
    this.router.navigateByUrl("/patient/dashboard");
  }
}
