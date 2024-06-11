import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitrequestFooterComponent } from './submitrequest-footer.component';

describe('SubmitrequestFooterComponent', () => {
  let component: SubmitrequestFooterComponent;
  let fixture: ComponentFixture<SubmitrequestFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitrequestFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitrequestFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
