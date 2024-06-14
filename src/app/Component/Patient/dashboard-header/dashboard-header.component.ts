import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {
  constructor(
    private router: Router,
    private messageService: MessageService
  ){}
  userEmail: string = localStorage.getItem("email")!;
  Logout(){
    localStorage.removeItem('token');
    this.messageService.add({ severity: 'success', summary: 'Login Out', detail: 'Successfully Logged Out', life:3000 });
    this.router.navigateByUrl("patient/login")
  }
} 
