import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorsTimetableComponent } from './edit-doctors-timetable.component';

describe('EditDoctorsTimetableComponent', () => {
  let component: EditDoctorsTimetableComponent;
  let fixture: ComponentFixture<EditDoctorsTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoctorsTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorsTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
