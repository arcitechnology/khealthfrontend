import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorTimetableComponent } from './view-doctor-timetable.component';

describe('ViewDoctorTimetableComponent', () => {
  let component: ViewDoctorTimetableComponent;
  let fixture: ComponentFixture<ViewDoctorTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDoctorTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDoctorTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
