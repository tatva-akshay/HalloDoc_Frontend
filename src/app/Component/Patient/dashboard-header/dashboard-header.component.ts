import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { Sidebar } from 'primeng/sidebar';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    ButtonModule,
    TabMenuModule,
    SidebarModule
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {
  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }
  userEmail: string = localStorage.getItem("email")!;

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink:['/patient/dashboard'] },
      { label: 'Profile', icon: 'pi pi-user', routerLink:['/patient/profile']}
    ]
  }
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
  Logout() {
    localStorage.removeItem('token');
    this.messageService.add({ severity: 'success', summary: 'Login Out', detail: 'Successfully Logged Out', life: 3000 });
    this.router.navigateByUrl("patient/login")
  }
} 
