import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {
  constructor(
    private router: Router
  ){}
  Logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl("patient/login")
  }
} 
