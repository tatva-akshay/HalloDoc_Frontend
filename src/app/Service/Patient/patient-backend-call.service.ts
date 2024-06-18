import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../../Model/Interface/Common/apiresponse';
import { Observable, map } from 'rxjs';
import { LoginDTO } from '../../Model/Interface/Login/login-dto';
import { ValidateEmailDTO } from '../../Model/Interface/Patient/validate-email-dto';
import { PatientDetails } from '../../Model/Interface/Patient/patient-details';
import { OtherRequestDTO } from '../../Model/Interface/Patient/other-request-dto';
import { PatientProfile } from '../../Model/Interface/Patient/patient-profile';

@Injectable({
  providedIn: 'root'
})
export class PatientBackendCallService {

  constructor(
    private http: HttpClient
  ) 
  { 

  }

  apiUrl:string = "https://localhost:7001";

  login(requestData:LoginDTO): Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Login`, requestData)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  getAllRegion(): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/GetRegionList`)
    .pipe(
      map((response) => {
        return response;
      })
    );
  }  

  ValidateEmail(validateEmailDTO:ValidateEmailDTO): Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ValidateEmail`,validateEmailDTO)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  createPatientRequest(patientDetails:PatientDetails): Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/PatientRequest`,patientDetails)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  forgetPassword(forgetPasswordDetails:ValidateEmailDTO): Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ForgotPassword`,forgetPasswordDetails)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  resetPasswordValidate(token:string): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/ResetPassword?token=${token}`)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  resetPassword(resetPasswordDetails:LoginDTO): Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/ResetPassword`,resetPasswordDetails)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  otherRequset(otherRequestDetails:OtherRequestDTO): Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.apiUrl}/api/Patient/OtherRequest`,otherRequestDetails)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  getDashboardContent(userEmail:ValidateEmailDTO): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/PatientDashboard?Email=${userEmail.email}`)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 
  
  getPatientProfile(userEmail:ValidateEmailDTO): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/GetPatientProfile?email=${userEmail.email}`)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  updatePatientProfile(patientprofile:PatientProfile): Observable<APIResponse>{
    return this.http.put<APIResponse>(`${this.apiUrl}/api/Patient/EditPatientProfile`,patientprofile)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

  getViewDocument(requestId:number): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}/api/Patient/SingleRequestView?requestId=${requestId}`)
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 

}
