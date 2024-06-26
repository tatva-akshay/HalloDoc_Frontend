import { Component } from '@angular/core';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CommonModule, formatDate } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Service/Patient/authservice.service';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { futureDateValidator, ageRangeValidator } from '../../../Validators/Bdate.validator';
import { emailValidator } from '../../../Validators/Email.validator';
import { RegionDropDown } from '../../../Model/Interface/Common/region-drop-down';
import { ValidateEmailDTO } from '../../../Model/Interface/Patient/validate-email-dto';
import { PatientProfile } from '../../../Model/Interface/Patient/patient-profile';
import { PatientDetails } from '../../../Model/Interface/Patient/patient-details';

@Component({
  selector: 'app-forme-request',
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
  templateUrl: './forme-request.component.html',
  styleUrl: './forme-request.component.scss'
})
export class FormeRequestComponent {
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
    const userEmailDTO: ValidateEmailDTO = {
      email: this.authService.getUserEmail()!
    };
    this.patientBackendCallService.getPatientProfile(userEmailDTO).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          const PatientProfileData: PatientProfile = response.result;

          this.PatientRequestForm.get("UserId")?.setValue(PatientProfileData?.userId)
          this.PatientRequestForm.get("FirstName")?.setValue(PatientProfileData?.firstName)
          this.PatientRequestForm.get("LastName")?.setValue(PatientProfileData?.lastName)
          this.PatientRequestForm.get("Bdate")?.setValue(new Date(PatientProfileData?.bdate))
          this.PatientRequestForm.get("Email")?.setValue(PatientProfileData?.email)
          this.PatientRequestForm.get("Mobile")?.setValue(PatientProfileData?.mobile)
          this.PatientRequestForm.get("Street")?.setValue(PatientProfileData?.street)
          this.PatientRequestForm.get("City")?.setValue(PatientProfileData?.city)
          this.PatientRequestForm.get("Zipcode")?.setValue(PatientProfileData?.zipCode)
          this.PatientRequestForm.get("regionId")?.setValue(PatientProfileData?.regionId)

          this.regionList = PatientProfileData?.allRegion;
        }
        else {
          console.log(response.error)
        }

      }, error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.toString() });
      }
    });
  }

  PatientRequestForm: FormGroup = this.formBuilder.group({
    Symptoms: [],
    FirstName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    LastName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    Bdate: ['', [Validators.required], [futureDateValidator, ageRangeValidator(18, 50)]],
    Email: ['', [Validators.required], [emailValidator]],
    Mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)], []],
    Street: ['', [Validators.required]],
    City: ['', [Validators.required]],
    Zipcode: ['', [Validators.required]],
    regionId: [null, [Validators.required]],
    Room: ['', [Validators.maxLength(20)], []],
    isPatientExist: [true, [], []],
    // File: [[], [], []]
  })

  patinetDataForm : FormData = new FormData();
  
  uploadDocument(event: any) {
    for (let file of event.files) {
      console.log(file)
      this.uploadedFiles.push(file.name);
      this.patinetDataForm.append('File', file, file.name);
    }  
  }

  PatientRequestSubmit() {
    // console.log(this.uploadedFiles)
    // this.PatientRequestForm.get("File")?.setValue(this.uploadedFiles);
    debugger
    if (this.PatientRequestForm.invalid) {
      this.PatientRequestForm.markAllAsTouched();
      return;
    }
    this.patinetDataForm.append("Symptoms",this.PatientRequestForm.get("Symptoms")?.value);
    this.patinetDataForm.append("FirstName",this.PatientRequestForm.get("FirstName")?.value);
    this.patinetDataForm.append("LastName",this.PatientRequestForm.get("LastName")?.value);
    this.patinetDataForm.append("Bdate",formatDate(this.PatientRequestForm.get("Bdate")?.value, 'yyyy-MM-ddTHH:mm:ss', 'en-US'));
    this.patinetDataForm.append("Email",this.PatientRequestForm.get("Email")?.value);
    this.patinetDataForm.append("Mobile",this.PatientRequestForm.get("Mobile")?.value);
    this.patinetDataForm.append("Street",this.PatientRequestForm.get("Street")?.value);
    this.patinetDataForm.append("City",this.PatientRequestForm.get("City")?.value);
    this.patinetDataForm.append("Zipcode",this.PatientRequestForm.get("Zipcode")?.value);
    this.patinetDataForm.append("regionId",this.PatientRequestForm.get("regionId")?.value);
    this.patinetDataForm.append("Room",this.PatientRequestForm.get("Room")?.value);
    this.patinetDataForm.append("isPatientExist",this.PatientRequestForm.get("isPatientExist")?.value);
    
    console.log(this.patinetDataForm);
    // const patientDetails: PatientDetail= undefined;

    this.patientBackendCallService.formeRequest(this.patinetDataForm).subscribe({
      next: (response) => {
        if (!response.isSuccess) {
          if (response.httpStatusCode == 400) {
            this.messageService.add({ severity: 'error', detail: response.error.toString(), life: 3000 });
          }
        }
        else if (response.isSuccess) {
          this.messageService.add({ severity: 'success', detail: 'Request Created!', life: 3000 });
          this.router.navigateByUrl("patient/dashboard")
        }
        else {
          this.messageService.add({ severity: 'error', detail: 'Internal error!', life: 3000 });
        }
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.toString() });
      }
    });
  }
}
