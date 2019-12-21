import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsAvailabilityComponent } from './doctors-availability.component';

describe('DoctorsAvailabilityComponent', () => {
  let component: DoctorsAvailabilityComponent;
  let fixture: ComponentFixture<DoctorsAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
