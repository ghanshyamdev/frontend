import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleAdminGuard } from './shared/guards/role-admin.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [
      AuthGuard,
      RoleAdminGuard
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
