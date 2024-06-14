import { Component } from '@angular/core';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParametersService } from '../../../Service/Patient/parameters.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ageRangeValidator, futureDateValidator } from '../../../Validators/Bdate.validator';
import { emailValidator } from '../../../Validators/Email.validator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RegionDropDown } from '../../../Model/Interface/Common/region-drop-down';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { Router, RouterLink } from '@angular/router';
import { OtherRequestDTO } from '../../../Model/Interface/Patient/other-request-dto';

@Component({
  selector: 'app-other-request',
  standalone: true,
  imports: [
    SubmitrequestHeaderComponent,
    SubmitrequestFooterComponent,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink
  ],
  providers: [PatientBackendCallService],
  templateUrl: './other-request.component.html',
  styleUrl: './other-request.component.scss'
})
export class OtherRequestComponent {
  isExistUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private patientBackendCallService: PatientBackendCallService,
    private parametersService: ParametersService,
    private router: Router
  ) {

  }
  requestorType: string = "2";
  regionList: RegionDropDown[] = [];
  ngOnInit(): void {

    this.requestorType = this.parametersService.getRequestButton() || "2";
    
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

  otherRequestForm: FormGroup = this.formBuilder.group({
    YFirstName: ['', [Validators.required,Validators.maxLength(10), Validators.minLength(3)]],
    YLastName: ['', [Validators.maxLength(10), Validators.minLength(3)]],
    YEmail: ['', [], [emailValidator]],
    YMobile: ['', [Validators.maxLength(10), Validators.minLength(10)], []],
    RelationName: ['', [], []],
    CCity: ['', [], []],
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
    RequestType: [this.requestorType]
    // Files: [[]],
  });

  RequestSubmit() {
    this.otherRequestForm.markAllAsTouched();
    if(this.otherRequestForm.invalid){
      return;
    }
    const otherRequestData: OtherRequestDTO = this.otherRequestForm.value;
    console.log(otherRequestData);

    this.patientBackendCallService.otherRequset(otherRequestData).subscribe((res:any)=>{
      console.log(res,"ressponse");
    })
    console.log(this.otherRequestForm.valid);
    localStorage.removeItem("requestType");
    this.router.navigateByUrl("")
  }
  
}
