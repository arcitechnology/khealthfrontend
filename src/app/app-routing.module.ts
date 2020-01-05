import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './doctors/edit-doctor/edit-doctor.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { AddHospitalComponent } from './hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent } from './hospitals/edit-hospital/edit-hospital.component';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { EditPatientsComponent } from './patients/edit-patients/edit-patients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DoctorsAvailabilityComponent } from './doctors-availability/doctors-availability.component';
import { DoctorsTimetableComponent } from './doctors-timetable/doctors-timetable.component';
import { AddDoctorsTimetableComponent } from './doctors-timetable/add-doctors-timetable/add-doctors-timetable.component';
import { EditDoctorsTimetableComponent } from './doctors-timetable/edit-doctors-timetable/edit-doctors-timetable.component';
import { ViewHospitalComponent } from './hospitals/view-hospital/view-hospital.component';
import { ViewDepartmentComponent } from './departments/view-department/view-department.component';
import { ViewPatientComponent } from './patients/view-patient/view-patient.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { ViewDoctorComponent } from './doctors/view-doctor/view-doctor.component';
import { ViewDoctorTimetableComponent } from './doctors-timetable/view-doctor-timetable/view-doctor-timetable.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MappingDoctorsComponent } from './mapping-doctors/mapping-doctors.component';




const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'users/edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'users/view-user/:id', component: ViewUserComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard] },
  { path: 'doctors/add-doctor', component: AddDoctorComponent, canActivate: [AuthGuard] },
  { path: 'doctors/edit-doctor/:id', component: AddDoctorComponent, canActivate: [AuthGuard] },
  { path: 'doctors/view-doctor/:id', component: ViewDoctorComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'departments/add-department', component: AddDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'departments/edit-department/:id', component: EditDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'departments/view-department/:id', component:ViewDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'hospitals', component: HospitalsComponent, canActivate: [AuthGuard] },
  { path: 'hospitals/edit-hospital/:id', component: AddHospitalComponent, canActivate: [AuthGuard] },
  { path: 'hospitals/add-hospital', component: AddHospitalComponent, canActivate: [AuthGuard] },
  { path: 'hospitals/view-hospital/:id', component:ViewHospitalComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
  { path: 'patients/add-patient', component: AddPatientComponent, canActivate: [AuthGuard] },
  { path: 'patients/edit-patient/:id', component: AddPatientComponent, canActivate: [AuthGuard] },
  { path: 'patients/view-patient/:id', component: ViewPatientComponent, canActivate: [AuthGuard] },
  { path: 'doctors-availability', component: DoctorsAvailabilityComponent, canActivate: [AuthGuard] },
  { path: 'doctors-timetable', component: DoctorsTimetableComponent, canActivate: [AuthGuard] },
  { path: 'doctors-timetable/add-doctors-timetable', component: AddDoctorsTimetableComponent, canActivate: [AuthGuard] },
  { path: 'doctors-timetable/edit-doctors-timetable/:id', component: EditDoctorsTimetableComponent, canActivate: [AuthGuard] },
  { path: 'doctors-timetable/view-doctors-timetable/:id', component: ViewDoctorTimetableComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'mapping-doctors', component: MappingDoctorsComponent, canActivate: [AuthGuard] },
  { path: '', component: DoctorsAvailabilityComponent, canActivate: [AuthGuard] },  
  { path: 'login', component: LoginComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
