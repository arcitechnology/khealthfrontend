import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DepartmentsComponent } from './departments/departments.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { PatientsComponent } from './patients/patients.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';
import { AddHospitalComponent } from './hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent } from './hospitals/edit-hospital/edit-hospital.component';
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './doctors/edit-doctor/edit-doctor.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { MenubarComponent } from './menubar/menubar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { EditPatientsComponent } from './patients/edit-patients/edit-patients.component';
import { LoginComponent } from './login/login.component';

import { DoctorsService } from './services/doctors.service';
import { HospitalsService } from './services/hospital.service';
import { PatientsService } from './services/patients.service';
import { DepartmentsService } from './services/departments.service';
import { UsersService } from './services/users.service';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { DoctorsAvailabilityComponent } from './doctors-availability/doctors-availability.component';
import { DoctorsTimetableComponent } from './doctors-timetable/doctors-timetable.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DoctorsComponent,
    DepartmentsComponent,
    HospitalsComponent,
    PatientsComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    AddHospitalComponent,
    EditHospitalComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    AddUserComponent,
    EditUserComponent,
    MenubarComponent,
    DashboardComponent,
    AddPatientComponent,
    EditPatientsComponent,
    LoginComponent,
    DoctorsAvailabilityComponent,
    DoctorsTimetableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    DataTablesModule,   

  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    DoctorsService,HospitalsService,DepartmentsService,PatientsService,UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
