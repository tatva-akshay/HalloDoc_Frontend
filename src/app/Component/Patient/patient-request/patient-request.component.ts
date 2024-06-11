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
import { matchPasswords, passwordValidator } from '../../../Validators/Password.validator';

@Component({
  selector: 'app-patient-request',
  standalone: true,
  imports: [SubmitrequestHeaderComponent, SubmitrequestFooterComponent, ReactiveFormsModule, HttpClientModule, CommonModule],
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

  PatientRequestForm: FormGroup = this.formBuilder.group({
    Symptoms: [],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Bdate: ['', Validators.required, futureDateValidator, ageRangeValidator(18, 50)],
    Email: ['', Validators.required, emailValidator],
    Mobile: ['', Validators.required],
    Street: ['', Validators.required],
    City: ['', Validators.required],
    Zipcode: ['', Validators.required],
    regionId: [''],
    Room: [''],
    File: [''],
    isPatientExist: [this.isExistUser]
  })

  ValidateEmail() {
    if (!this.PatientRequestForm.get('Email')?.valid) {
      console.log("called")
      return;
    }
    else {
      var emailValue: string = this.PatientRequestForm.get('Email')?.value;
      const validateEmailDTO: ValidateEmailDTO = {email : emailValue};
      // debugger
      console.log(this.PatientRequestForm.get('Email')?.value)
      this.http.post("https://localhost:7001/api/Patient/ValidateEmail", validateEmailDTO).subscribe((res: any) => {
        console.log(res);
        if (!res.isSuccess) {
          if(res.httpStatusCode == 404){
            this.isExistUser = false;
            this.PatientRequestForm.get('isPatientExist')?.setValue(this.isExistUser);
            this.PatientRequestForm.addControl('PasswordHash', new FormControl('', [Validators.required]));
            // this.PatientRequestForm.addControl('ConfirmPasswordHash', new FormControl('',[matchPasswords("","")] ));
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
    console.log(this.PatientRequestForm.value)
    console.log(this.PatientRequestForm.valid)
    if (this.PatientRequestForm.invalid) {
      return;
    }
  }

}
