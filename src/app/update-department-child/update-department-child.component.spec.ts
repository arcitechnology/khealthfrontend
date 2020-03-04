import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartmentChildComponent } from './update-department-child.component';

describe('UpdateDepartmentChildComponent', () => {
  let component: UpdateDepartmentChildComponent;
  let fixture: ComponentFixture<UpdateDepartmentChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDepartmentChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDepartmentChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
