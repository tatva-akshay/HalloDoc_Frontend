import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRequestComponent } from './other-request.component';

describe('OtherRequestComponent', () => {
  let component: OtherRequestComponent;
  let fixture: ComponentFixture<OtherRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
