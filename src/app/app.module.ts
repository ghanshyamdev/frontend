import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpCallsService } from './shared/services/http-calls.service';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OwlModule } from 'ngx-owl-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { RoleAdminGuard } from './shared/guards/role-admin.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    NavbarComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OwlModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    })
  ],
  providers: [
    HttpCallsService,
    AuthGuard,
    AuthService,
    RoleAdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
