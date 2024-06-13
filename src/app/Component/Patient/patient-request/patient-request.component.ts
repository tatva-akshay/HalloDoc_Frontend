import { Component } from '@angular/core';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { Route, Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ageRangeValidator, futureDateValidator } from '../../../Validators/Bdate.validator';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
    Mobile: ['', [Validators.required]],
    Street: ['', [Validators.required]],
    City: ['', [Validators.required]],
    Zipcode: ['', [Validators.required]],
    regionId: [null, [Validators.required]],
    Room: ['', [Validators.maxLength(20)], []],
    // Files: [[]],
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
            this.PatientRequestForm.addControl('ConfirmPasswordHash', new FormControl('',[Validators.required]));
            this.PatientRequestForm.addValidators(this.ConfirmPasswordValidator);
            this.messageService.add({ severity: 'error', detail: 'User Does Not Exists! Enter Password!', life: 3000 });
          }
        }
        else if (res.isSuccess) {
          this.isExistUser = true;
          this.PatientRequestForm.get('isPatientExist')?.setValue(this.isExistUser);
          this.PatientRequestForm.removeControl('PasswordHash');
          this.PatientRequestForm.removeControl('ConfirmPasswordHash');
          if(res.result.role != "3"){
            this.messageService.add({ severity: 'error', detail: "You're not authorized For Request!", life: 3000 });
            this.router.navigateByUrl("");
          }
          else{
            this.messageService.add({ severity: 'success', detail: 'Exists User!', life: 3000 });
          }
        }
        else {
          alert("Internal error!")
        }
      });
    }
  }

  PatientRequestSubmit() {
    const patientDetails: PatientDetails = this.PatientRequestForm.value;
    console.log("PatientDetails", patientDetails)
    console.log(this.PatientRequestForm.value)
    console.log(this.PatientRequestForm.valid)
    if (this.PatientRequestForm.invalid) {
      this.PatientRequestForm.markAllAsTouched();
      return;
    }
    this.patientBackendCallService.createPatientRequest(patientDetails).subscribe((res: any) => {
      console.log(res);
      if (!res.isSuccess) {
        if (res.httpStatusCode == 400) {
          alert(res.error)
        }
      }
      else if (res.isSuccess) {
        this.router.navigateByUrl("patient/login")
        alert("request Created")
      }
      else {
        alert("Internal error!")
      }
    });
  }
}
