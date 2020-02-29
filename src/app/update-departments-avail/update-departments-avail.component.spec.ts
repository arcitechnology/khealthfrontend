import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartmentsAvailComponent } from './update-departments-avail.component';

describe('UpdateDepartmentsAvailComponent', () => {
  let component: UpdateDepartmentsAvailComponent;
  let fixture: ComponentFixture<UpdateDepartmentsAvailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDepartmentsAvailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDepartmentsAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
