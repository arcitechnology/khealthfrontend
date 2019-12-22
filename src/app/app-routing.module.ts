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





const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'users/edit-user', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard] },
  { path: 'doctors/add-doctor', component: AddDoctorComponent, canActivate: [AuthGuard] },
  { path: 'doctors/edit-doctor', component: EditDoctorComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'departments/add-department', component: AddDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'departments/edit-department', component: EditDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'hospitals', component: HospitalsComponent, canActivate: [AuthGuard] },
  { path: 'hospitals/edit-hospital/:id', component: AddHospitalComponent, canActivate: [AuthGuard] },
  { path: 'hospitals/add-hospital', component: AddHospitalComponent, canActivate: [AuthGuard] }, 
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
  { path: 'patients/add-patient', component: AddPatientComponent, canActivate: [AuthGuard] },
  { path: 'patients/edit-patient', component: EditPatientsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }