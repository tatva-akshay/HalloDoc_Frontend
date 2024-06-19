import { Component } from '@angular/core';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ageRangeValidator, futureDateValidator } from '../../../Validators/Bdate.validator';
import { emailValidator } from '../../../Validators/Email.validator';
import { DropDownInterface } from '../../../Model/Interface/Common/drop-down-interface';

import { PatientBackendCallService } from '../../../Service/Patient/patient-backend-call.service';
import { RegionDropDown } from '../../../Model/Interface/Common/region-drop-down';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../Service/Patient/authservice.service';
import { ValidateEmailDTO } from '../../../Model/Interface/Patient/validate-email-dto';
import { PatientProfile } from '../../../Model/Interface/Patient/patient-profile';
@Component({
  selector: 'app-patientprofile',
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
  ],
  providers: [PatientBackendCallService],
  templateUrl: './patientprofile.component.html',
  styleUrl: './patientprofile.component.scss'
})
export class PatientprofileComponent {
  constructor(
    private formBuilder: FormBuilder,
    private patientBackendCallService: PatientBackendCallService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {

  }

  callTypeList: DropDownInterface[] = [
    { name: "Mobile", value: 0 },
    { name: "LanLine", value: 1 },
  ];

  regionList?: RegionDropDown[];
  isEditButton: boolean = true;
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const userEmailDTO: ValidateEmailDTO = {
      // email: localStorage.getItem('email')!
      email: this.authService.getUserEmail()!
    };

    this.patientBackendCallService.getPatientProfile(userEmailDTO).subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          // console.log(response);
          const PatientProfileData: PatientProfile = response.result;
          // console.log(this.PatientProfileData)

          this.patientProfileForm.get("UserId")?.setValue(PatientProfileData?.userId)
          this.patientProfileForm.get("FirstName")?.setValue(PatientProfileData?.firstName)
          this.patientProfileForm.get("LastName")?.setValue(PatientProfileData?.lastName)
          this.patientProfileForm.get("Bdate")?.setValue(new Date(PatientProfileData?.bdate))
          this.patientProfileForm.get("Email")?.setValue(PatientProfileData?.email)
          this.patientProfileForm.get("Mobile")?.setValue(PatientProfileData?.mobile)
          this.patientProfileForm.get("Street")?.setValue(PatientProfileData?.street)
          this.patientProfileForm.get("City")?.setValue(PatientProfileData?.city)
          this.patientProfileForm.get("Zipcode")?.setValue(PatientProfileData?.zipCode)
          this.patientProfileForm.get("regionId")?.setValue(PatientProfileData?.regionId)

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

  resetForm() {
    this.patientProfileForm.reset();
    this.isEditButton = true;
    this.getData();
  }
  patientProfileForm: FormGroup = this.formBuilder.group({
    UserId:['',[],[]],
    FirstName: [{ value: '' }, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    LastName: [{ value: '' }, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    Bdate: [{value:''}, [], [futureDateValidator, ageRangeValidator(18, 50)]],
    Email: [{ value: '' }, [Validators.required], []],
    CallType: [0, [], []],
    Mobile: [{ value: '' }, [Validators.required, Validators.maxLength(10), Validators.minLength(10)], []],
    Street: [{ value: '' }, [Validators.required]],
    City: [{ value: '' }, [Validators.required]],
    Zipcode: [{ value: '' }, [Validators.required]],
    regionId: [null, [Validators.required]],
  })

  EditPatientProfile() {
    if(this.patientProfileForm.invalid){
      return;
    }
    this.isEditButton = true;
    console.log(this.patientProfileForm.value);
    console.log(this.patientProfileForm.valid);
    const PatientProfileData: PatientProfile = this.patientProfileForm.value;
    console.log(PatientProfileData);
    this.patientBackendCallService.updatePatientProfile(PatientProfileData).subscribe({
      next:(response:any)=>{
        this.messageService.add({ severity: 'success', summary: 'Update Successfull!' });
      },
      error:(error:any)=>{
        this.messageService.add({ severity: 'error', summary: 'Error in Update', detail: error.toString() });
      }
    })
  }
}
