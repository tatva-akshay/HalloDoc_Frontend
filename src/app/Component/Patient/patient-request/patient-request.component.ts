import { Component } from '@angular/core';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { Route, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ageRangeValidator, futureDateValidator } from '../../../Validators/Bdate.validator';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../../Validators/Email.validator';
import { ValidateEmailDTO } from '../../../Model/Interface/Patient/validate-email-dto';
import { PatientDetails } from '../../../Model/Interface/Patient/patient-details';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { matchPasswords, passwordValidator } from '../../../Validators/Password.validator';

@Component({
  selector: 'app-patient-request',
  standalone: true,
  imports: [SubmitrequestHeaderComponent, SubmitrequestFooterComponent, ReactiveFormsModule, HttpClientModule, CommonModule, FileUploadModule, ToastModule, RouterLink],
  providers:[MessageService],
  templateUrl: './patient-request.component.html',
  styleUrl: './patient-request.component.scss'
})
export class PatientRequestComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  isExistUser: boolean = true;
  regionList: { regionId: number, name: string }[] = [];

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
    regionId: [null,[Validators.required]],
    Room: [''],
    // Files: [[]],
    isPatientExist: [this.isExistUser]
  })

  ngOnInit() {
    this.http.get("https://localhost:7001/api/Patient/GetRegionList").subscribe((res: any) => {
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
      this.http.post("https://localhost:7001/api/Patient/ValidateEmail", validateEmailDTO).subscribe((res: any) => {
        console.log(res);
        if (!res.isSuccess) {
          if (res.httpStatusCode == 404) {
            this.isExistUser = false;
            this.PatientRequestForm.get('isPatientExist')?.setValue(this.isExistUser);
            this.PatientRequestForm.addControl('PasswordHash', new FormControl('', [Validators.required],[passwordValidator]));
            // this.PatientRequestForm.addControl('ConfirmPasswordHash', new FormControl('', ));
            alert("user does not exist! Enter your Password")
          }
        }
        else if (res.isSuccess) {
          this.isExistUser = true;
          this.PatientRequestForm.get('isPatientExist')?.setValue(this.isExistUser);
          this.PatientRequestForm.removeControl('PasswordHash');
          this.PatientRequestForm.removeControl('ConfirmPasswordHash');
          alert("already User Exist")
        }
        else {
          alert("Internal error!")
        }
      });
    }
  }

  PatientRequestSubmit() {
    const patientDetails : PatientDetails = this.PatientRequestForm.value;
    console.log("PatientDetails",patientDetails)
    console.log(this.PatientRequestForm.value)
    console.log(this.PatientRequestForm.valid)
    if (this.PatientRequestForm.invalid) {
      this.PatientRequestForm.markAllAsTouched();
      return;
    }
    this.http.post("https://localhost:7001/api/Patient/PatientRequest", patientDetails).subscribe((res: any) => {
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
