import { Component, ElementRef } from '@angular/core';
import { PatientLoginNavComponent } from '../../Patient/patient-login-nav/patient-login-nav.component';
import { PatientLoginFooterComponent } from '../../Patient/patient-login-footer/patient-login-footer.component';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginDTO } from '../../../Model/Interface/Login/login-dto';
import { Router,RouterLink } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { emailValidator } from '../../../Validators/Email.validator';
import { passwordValidator } from '../../../Validators/Password.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [PatientLoginNavComponent, PatientLoginFooterComponent, ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss'
})
export class PatientLoginComponent {

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    
  }

  loginForm: FormGroup = this.formBuilder.group({
    Email: ['',Validators.required,emailValidator],
    Password: ['',Validators.required]
    // Password: ['',Validators.required,passwordValidator]
  });

  visiblitypassword() {
    const passwordInput = this.elementRef.nativeElement.querySelector('#passwordshow');
    if (passwordInput.type === 'text') {
      passwordInput.type = 'password';
      this.elementRef.nativeElement.querySelector('#hidepassword').style.display = 'none';
    } else {
      passwordInput.type = 'text';
      this.elementRef.nativeElement.querySelector('#hidepassword').style.display = 'block';
    }
    console.log(this.loginForm.invalid);
  }

  loginSubmit(){
    // debugger
    console.log(this.loginForm.value);
    const loginUserDetails: LoginDTO = this.loginForm.value;

    this.http.post("https://localhost:7001/api/Login", loginUserDetails).subscribe((res: any) => {
      console.log(res);
      if(!res.isSuccess){
        if(res.httpStatusCode == 404){
            alert("user Not Found")
        }
        else if(res.httpStatusCode == 403){
          alert("Invalid Password")
        }
        else if(res.httpStatusCode == 400){
          alert("Reset your Password/Create Account")
        }
      }
      else if(res.isSuccess){
        localStorage.setItem("token",res.result.token);
        this.router.navigateByUrl("patient/dashboard");
      }
      else{
        alert("Internal error!")
      }
    });
  }
  
}
