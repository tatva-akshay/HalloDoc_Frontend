import { Routes } from '@angular/router';
import { LayoutComponent } from './Component/Common/layout/layout.component';
import { PatientLoginComponent } from './Component/Patient/patient-login/patient-login.component';
import { PatientForgotPasswordComponent } from './Component/Patient/patient-forgot-password/patient-forgot-password.component';
import { PatientDashboardComponent } from './Component/Patient/patient-dashboard/patient-dashboard.component';
import { publicRouteGuard } from './Guards/public-route.guard';
import { PatientRequestComponent } from './Component/Patient/patient-request/patient-request.component';
import { PatientSiteComponent } from './Component/Patient/patient-site/patient-site.component';
import { SubmitRequestComponent } from './Component/Patient/submit-request/submit-request.component';
import { ResetPasswordComponent } from './Component/Patient/reset-password/reset-password.component';
import { CreateaccountComponent } from './Component/Patient/createaccount/createaccount.component';
import { OtherRequestComponent } from './Component/Patient/other-request/other-request.component';
import { resetpasswordGuardGuard } from './Guards/resetpassword-guard.guard';
import { PatientprofileComponent } from './Component/Patient/patientprofile/patientprofile.component';
import { ViewDocumentComponent } from './Component/Patient/view-document/view-document.component';
import { FormeRequestComponent } from './Component/Patient/forme-request/forme-request.component';
import { SomeoneElseRequestComponent } from './Component/Patient/someone-else-request/someone-else-request.component';

export const routes: Routes = [
    {path:"", component:PatientSiteComponent},
    {path:"submitrequest", component:SubmitRequestComponent},
    {path:"patient/login", component:PatientLoginComponent},
    {path:"patient/forgetpassword", component:PatientForgotPasswordComponent},
    {path:"patient/resetpassword", component:ResetPasswordComponent, canActivate: [resetpasswordGuardGuard]},
    {path:"patient/createaccount", component:CreateaccountComponent, canActivate: [resetpasswordGuardGuard]},
    {path:"patient/patientrequest", component:PatientRequestComponent},
    {path:"patient/otherrequest", component:OtherRequestComponent},
    {path:"patient/dashboard", component:PatientDashboardComponent, canActivate: [publicRouteGuard]},
    {path:"patient/profile", component:PatientprofileComponent, canActivate: [publicRouteGuard]},
    {path:"patient/viewdocument", component:ViewDocumentComponent, canActivate: [publicRouteGuard]},
    {path:"patient/formerequest", component:FormeRequestComponent, canActivate: [publicRouteGuard]},
    {path:"patient/someoneelserequest", component:SomeoneElseRequestComponent, canActivate: [publicRouteGuard]},
    {path:"**",component:PatientSiteComponent}
];
