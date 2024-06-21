import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { Sidebar } from 'primeng/sidebar';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../Service/Patient/authservice.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    ButtonModule,
    TabMenuModule,
    SidebarModule
  ],
  providers:[AuthService],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute 
  ) {
    
   }
  userEmail: string = this.authService.getUserEmail()!;
  items: MenuItem[] =[];
  activeTab: MenuItem | undefined; // Initialize active tab ID
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink:['/patient/dashboard'], id:'Dashboard' },
      { label: 'Profile', icon: 'pi pi-user', routerLink:['/patient/profile'], id:'Profile'}
    ]

    this.checkActiveTab();

    // Subscribe to router events to dynamically update active tab
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkActiveTab();
      }
    });
  }

  checkActiveTab(): void {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/patient/viewdocument') || currentRoute.includes('/patient/formerequest') || currentRoute.includes('/patient/someoneelserequest')) {
          this.activeTab = this.items.find(item => item.id=="Dashboard");
        } else if (currentRoute.includes('/patient/profile')) {
          this.activeTab = this.items.find(item => item.id=="Profile");
        } else {
          // Handle other routes if needed
          this.activeTab = this.items.find(item => item.id=="Dashboard"); // Default to Dashboard if no match
        }
  }

  closeCallback(e:any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.messageService.add({ severity: 'success', summary: 'Login Out', detail: 'Successfully Logged Out', life: 3000 });
    this.router.navigateByUrl("patient/login")
  }
} 
