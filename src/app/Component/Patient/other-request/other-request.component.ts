import { Component } from '@angular/core';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
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
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

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
    RouterLink,
    FileUploadModule,
    ToastModule
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
  uploadedFiles: File[] = [];
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('requestType');
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

  otherRequestFormData: FormData = new FormData();

  uploadDocument(event: any) {
    for (let file of event.files) {
      console.log(file)
      this.uploadedFiles.push(file.name);
      this.otherRequestFormData.append('File', file, file.name);
    }
  }

  RequestSubmit() {
    this.otherRequestForm.markAllAsTouched();
    if(this.otherRequestForm.invalid){
      return;
    }
    const otherRequestData: OtherRequestDTO = this.otherRequestForm.value;

    this.otherRequestFormData.append("YFirstName", this.otherRequestForm.get("YFirstName")?.value);
    this.otherRequestFormData.append("YLastName", this.otherRequestForm.get("YLastName")?.value);
    this.otherRequestFormData.append("YEmail", this.otherRequestForm.get("YEmail")?.value);
    this.otherRequestFormData.append("YMobile", this.otherRequestForm.get("YMobile")?.value);
    this.otherRequestFormData.append("RelationName", this.otherRequestForm.get("RelationName")?.value);
    
    this.otherRequestFormData.append("Symptoms", this.otherRequestForm.get("Symptoms")?.value);
    this.otherRequestFormData.append("FirstName", this.otherRequestForm.get("FirstName")?.value);
    this.otherRequestFormData.append("LastName", this.otherRequestForm.get("LastName")?.value);
    this.otherRequestFormData.append("Bdate", formatDate(this.otherRequestForm.get("Bdate")?.value, 'yyyy-MM-ddTHH:mm:ss', 'en-US'));
    this.otherRequestFormData.append("Email", this.otherRequestForm.get("Email")?.value);
    this.otherRequestFormData.append("Mobile", this.otherRequestForm.get("Mobile")?.value);
    this.otherRequestFormData.append("Street", this.otherRequestForm.get("Street")?.value);
    this.otherRequestFormData.append("City", this.otherRequestForm.get("City")?.value);
    this.otherRequestFormData.append("Zipcode", this.otherRequestForm.get("Zipcode")?.value);
    this.otherRequestFormData.append("regionId", this.otherRequestForm.get("regionId")?.value);
    this.otherRequestFormData.append("Room", this.otherRequestForm.get("Room")?.value);

    console.log(otherRequestData);

    this.patientBackendCallService.otherRequset(this.otherRequestFormData).subscribe((res:any)=>{
      if (!res.isSuccess) {
        if (res.httpStatusCode == 400) {
          this.messageService.add({ severity: 'error', detail: res.error.toString(), life: 3000 });
        }
      }
      else if (res.isSuccess) {
        this.messageService.add({ severity: 'success', detail: 'Request Created!', life: 3000 });
        this.router.navigateByUrl("")
      }
      else {
        this.messageService.add({ severity: 'error', detail: 'Internal error!', life: 3000 });
      }
    })
    console.log(this.otherRequestForm.valid);
  }
  
}
