import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../../Model/Interface/Common/apiresponse';
import { Observable, map, zip } from 'rxjs';
import { LoginDTO } from '../../Model/Interface/Login/login-dto';
import { ValidateEmailDTO } from '../../Model/Interface/Patient/validate-email-dto';
import { PatientDetails } from '../../Model/Interface/Patient/patient-details';
import { OtherRequestDTO } from '../../Model/Interface/Patient/other-request-dto';
import { PatientProfile } from '../../Model/Interface/Patient/patient-profile';
import { DownloadRWF } from '../../Model/Interface/Patient/download-rwf';
import { debug } from 'console';
import { blob } from 'stream/consumers';
import { Blob } from 'buffer';
import { BlankIcon } from 'primeng/icons/blank';

@Injectable({
  providedIn: 'root'
})
export class PatientBackendCallService {

  constructor(
    private http: HttpClient
  ) {

  }

  apiUrl: string = "https://localhost:7001";

  login(requestData: LoginDTO): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Login`, requestData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllRegion(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/GetRegionList`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  ValidateEmail(validateEmailDTO: ValidateEmailDTO): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ValidateEmail`, validateEmailDTO)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  createPatientRequest(patientDetails: FormData): Observable<APIResponse> {
    console.log(patientDetails);
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/PatientRequest`, patientDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  forgetPassword(forgetPasswordDetails: ValidateEmailDTO): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ForgotPassword`, forgetPasswordDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  resetPasswordValidate(token: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/ResetPassword?token=${token}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  resetPassword(resetPasswordDetails: LoginDTO): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ResetPassword`, resetPasswordDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  otherRequset(otherRequestDetails: FormData): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/OtherRequest`, otherRequestDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getDashboardContent(userEmail: ValidateEmailDTO): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/PatientDashboard?Email=${userEmail.email}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getPatientProfile(userEmail: ValidateEmailDTO): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/GetPatientProfile?email=${userEmail.email}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  updatePatientProfile(patientprofile: PatientProfile): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.apiUrl}/api/Patient/EditPatientProfile`, patientprofile)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getViewDocument(requestId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/SingleRequestView?requestId=${requestId}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  uploadDocument(documentFormData: FormData): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/UploadDocument`, documentFormData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  downloadDocument(downloadDocument: DownloadRWF): Observable<Blob> {
    debugger
    return this.http.post<Blob>(`${this.apiUrl}/api/Patient/DownloadDocuments`, downloadDocument, {
      
    }
    )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteDocument(requestWiseFileId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/DeleteDocument?requestWiseFileId=${requestWiseFileId}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  formeRequest(patientDetails: FormData): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ForMeRequest`, patientDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  someoneElseRequest(otherRequestDetails: FormData): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ForSomeoneElseRequest`, otherRequestDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

}
