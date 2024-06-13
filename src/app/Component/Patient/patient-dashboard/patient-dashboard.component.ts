import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import {SubmitrequestFooterComponent} from '../submitrequest-footer/submitrequest-footer.component'
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    SubmitrequestFooterComponent, 
    DashboardHeaderComponent,
    ToastModule,
    MessagesModule
  ],
  providers:[],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {
  constructor(
    private messageService: MessageService
  ){
    
  }
  
  ngOnInit(): void {
  }

}
