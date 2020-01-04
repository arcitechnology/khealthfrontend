import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingDoctorsComponent } from './mapping-doctors.component';

describe('MappingDoctorsComponent', () => {
  let component: MappingDoctorsComponent;
  let fixture: ComponentFixture<MappingDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
