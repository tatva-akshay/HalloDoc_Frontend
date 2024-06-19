import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeoneElseRequestComponent } from './someone-else-request.component';

describe('SomeoneElseRequestComponent', () => {
  let component: SomeoneElseRequestComponent;
  let fixture: ComponentFixture<SomeoneElseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SomeoneElseRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SomeoneElseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
