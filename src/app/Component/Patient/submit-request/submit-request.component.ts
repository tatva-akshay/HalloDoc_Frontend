import { Component } from '@angular/core';
import { SubmitrequestHeaderComponent } from '../submitrequest-header/submitrequest-header.component';
import { SubmitrequestFooterComponent } from '../submitrequest-footer/submitrequest-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-submit-request',
  standalone: true,
  imports: [SubmitrequestHeaderComponent, SubmitrequestFooterComponent, RouterLink],
  templateUrl: './submit-request.component.html',
  styleUrl: './submit-request.component.scss'
})
export class SubmitRequestComponent {

}
