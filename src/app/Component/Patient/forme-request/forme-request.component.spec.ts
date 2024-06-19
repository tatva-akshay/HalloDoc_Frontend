import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeRequestComponent } from './forme-request.component';

describe('FormeRequestComponent', () => {
  let component: FormeRequestComponent;
  let fixture: ComponentFixture<FormeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormeRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
