import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsTimetableComponent } from './doctors-timetable.component';

describe('DoctorsTimetableComponent', () => {
  let component: DoctorsTimetableComponent;
  let fixture: ComponentFixture<DoctorsTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
