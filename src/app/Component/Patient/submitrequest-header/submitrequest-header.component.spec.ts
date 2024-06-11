import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitrequestHeaderComponent } from './submitrequest-header.component';

describe('SubmitrequestHeaderComponent', () => {
  let component: SubmitrequestHeaderComponent;
  let fixture: ComponentFixture<SubmitrequestHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitrequestHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitrequestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
