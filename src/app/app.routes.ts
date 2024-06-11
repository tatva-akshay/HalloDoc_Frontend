import { Routes } from '@angular/router';
import { LayoutComponent } from './Component/Common/layout/layout.component';
import { PatientLoginComponent } from './Component/Patient/patient-login/patient-login.component';
import { PatientForgotPasswordComponent } from './Component/Patient/patient-forgot-password/patient-forgot-password.component';
import { PatientDashboardComponent } from './Component/Patient/patient-dashboard/patient-dashboard.component';
import { publicRouteGuard } from './Guards/public-route.guard';
import { PatientRequestComponent } from './Component/Patient/patient-request/patient-request.component';

export const routes: Routes = [
    {path:"patient/login", component:PatientLoginComponent},
    {path:"patient/forgetpassword", component:PatientForgotPasswordComponent},
    {path:"patient/patientrequest", component:PatientRequestComponent},
    {path:"patient/dashboard", component:PatientDashboardComponent, canActivate: [publicRouteGuard]},
];
