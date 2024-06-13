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

export const routes: Routes = [
    {path:"", component:PatientSiteComponent},
    {path:"submitrequest", component:SubmitRequestComponent},
    {path:"patient/login", component:PatientLoginComponent},
    {path:"patient/forgetpassword", component:PatientForgotPasswordComponent},
    {path:"patient/resetpassword", component:ResetPasswordComponent},
    {path:"patient/createaccount", component:CreateaccountComponent},
    {path:"patient/patientrequest", component:PatientRequestComponent},
    {path:"patient/dashboard", component:PatientDashboardComponent, canActivate: [publicRouteGuard]},
];
