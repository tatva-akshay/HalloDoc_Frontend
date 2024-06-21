import { Component } from '@angular/core';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { Route, Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ageRangeValidator, futureDateValidator } from '../../../Validators/Bdate.validator';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule, formatDate } from '@angular/common';
import { emailValidator } from '../../../Validators/Email.validator';
import { ValidateEmailDTO } from '../../../Model/Interface/Patient/validate-email-dto';
import { PatientDetails } from '../../../Model/Interface/Patient/patient-details';
import { matchPasswords, passwordValidator } from '../../../Validators/Password.validator';

import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { validateHeaderName } from 'http';
import { RegionDropDown } from '../../../Model/Interface/Common/region-drop-down';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';

@Component({
  selector: 'app-patient-request',
  standalone: true,
  imports: [
    SubmitrequestHeaderComponent,
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
    PasswordModule,
    DropdownModule,
    ButtonModule
  ],
  providers: [PatientBackendCallService],
  templateUrl: './patient-request.component.html',
  styleUrl: './patient-request.component.scss'
})
export class PatientRequestComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private patientBackendCallService: PatientBackendCallService
  ) {

  }

  isExistUser: boolean = true;
  regionList: RegionDropDown[] = [];
  uploadedFiles: File[] = [];

  ConfirmPasswordValidator(control: AbstractControl) {
    debugger;
    let a = control.get('PasswordHash')
    let b = control.get('ConfirmPasswordHash')
    return control.get('PasswordHash')?.value === control.get('ConfirmPasswordHash')?.value ? null : { PasswordMismatch: true }
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
    File: new FormData(),
    isPatientExist: [this.isExistUser]
  })

  ngOnInit() {
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

  ValidateEmail() {
    if (!this.PatientRequestForm.get('Email')?.valid) {
      console.log("called")
      return;
    }
    else {
      var emailValue: string = this.PatientRequestForm.get('Email')?.value;
      const validateEmailDTO: ValidateEmailDTO = { email: emailValue };
      // debugger
      console.log(this.PatientRequestForm.get('Email')?.value)
      this.patientBackendCallService.ValidateEmail(validateEmailDTO).subscribe((res: any) => {
        console.log(res);
        if (!res.isSuccess) {
          if (res.httpStatusCode == 404) {
            this.isExistUser = false;
            this.PatientRequestForm.get('isPatientExist')?.setValue(this.isExistUser);
            this.PatientRequestForm.addControl('PasswordHash', new FormControl('', [Validators.required], [passwordValidator]));
            this.PatientRequestForm.addControl('ConfirmPasswordHash', new FormControl('', [Validators.required]));
            this.PatientRequestForm.addValidators(this.ConfirmPasswordValidator);
            this.messageService.add({ severity: 'error', detail: 'User Does Not Exists! Enter Password!', life: 3000 });
          }
        }
        else if (res.isSuccess) {
          this.isExistUser = true;
          this.PatientRequestForm.get('isPatientExist')?.setValue(this.isExistUser);
          this.PatientRequestForm.removeControl('PasswordHash');
          this.PatientRequestForm.removeControl('ConfirmPasswordHash');
          if (res.result.role != "3") {
            this.messageService.add({ severity: 'error', detail: "You're not authorized For Request!", life: 3000 });
            this.router.navigateByUrl("");
          }
          else {
            this.messageService.add({ severity: 'success', detail: 'Exists User!', life: 3000 });
          }
        }
        else {
          alert("Internal error!")
        }
      });
    }
  }

  patientRequestFormData: FormData = new FormData();

  uploadDocument(event: any) {
    for (let file of event.files) {
      console.log(file)
      this.uploadedFiles.push(file.name);
      this.patientRequestFormData.append('File', file, file.name);
    }
  }

  PatientRequestSubmit() {

    if (this.PatientRequestForm.invalid) {
      this.PatientRequestForm.markAllAsTouched();
      return;
    }
    
    console.log(this.PatientRequestForm)
    this.patientRequestFormData.append("Symptoms", this.PatientRequestForm.get("Symptoms")?.value);
    this.patientRequestFormData.append("FirstName", this.PatientRequestForm.get("FirstName")?.value);
    this.patientRequestFormData.append("LastName", this.PatientRequestForm.get("LastName")?.value);
    this.patientRequestFormData.append("Bdate", formatDate(this.PatientRequestForm.get("Bdate")?.value, 'yyyy-MM-ddTHH:mm:ss', 'en-US'));
    this.patientRequestFormData.append("Email", this.PatientRequestForm.get("Email")?.value);
    this.patientRequestFormData.append("Mobile", this.PatientRequestForm.get("Mobile")?.value);
    this.patientRequestFormData.append("Street", this.PatientRequestForm.get("Street")?.value);
    this.patientRequestFormData.append("City", this.PatientRequestForm.get("City")?.value);
    this.patientRequestFormData.append("Zipcode", this.PatientRequestForm.get("Zipcode")?.value);
    this.patientRequestFormData.append("regionId", this.PatientRequestForm.get("regionId")?.value);
    this.patientRequestFormData.append("Room", this.PatientRequestForm.get("Room")?.value);
    this.patientRequestFormData.append("isPatientExist", this.PatientRequestForm.get("isPatientExist")?.value);

    this.PatientRequestForm.get("File")?.setValue(this.patientRequestFormData);

    console.log(this.PatientRequestForm)

    this.patientBackendCallService.createPatientRequest(this.patientRequestFormData).subscribe((res: any) => {
      if (!res.isSuccess) {
        if (res.httpStatusCode == 400) {
          this.messageService.add({ severity: 'error', detail: res.error.toString(), life: 3000 });
        }
      }
      else if (res.isSuccess) {
        this.messageService.add({ severity: 'success', detail: 'Request Created!', life: 3000 });
        this.router.navigateByUrl("patient/login")
      }
      else {
        this.messageService.add({ severity: 'error', detail: 'Internal error!', life: 3000 });
      }
    });
  }
}
