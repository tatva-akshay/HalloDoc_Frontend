import { Component, inject } from '@angular/core';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ParametersService } from '../../../Service/Patient/parameters.service';

@Component({
  selector: 'app-submit-request',
  standalone: true,
  imports: [
    SubmitrequestHeaderComponent, 
    SubmitrequestFooterComponent, 
    RouterLink,
    ButtonModule
  ],
  templateUrl: './submit-request.component.html',
  styleUrl: './submit-request.component.scss'
})
export class SubmitRequestComponent {

  parametersService : ParametersService = inject(ParametersService);
  OtherRequest(value: number){
    this.parametersService.setRequestButton(value);
  }

}
