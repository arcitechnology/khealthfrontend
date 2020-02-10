import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchAndShowHospitalsComponent } from './fetch-and-show-hospitals.component';

describe('FetchAndShowHospitalsComponent', () => {
  let component: FetchAndShowHospitalsComponent;
  let fixture: ComponentFixture<FetchAndShowHospitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchAndShowHospitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchAndShowHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
