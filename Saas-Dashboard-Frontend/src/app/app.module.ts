import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/components/sidebar/sidebar/sidebar.component';
import { MainLayoutComponent } from './layouts/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/layouts/auth-layout/auth-layout.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
//import { EditProfileComponent } from './user-profile/Edit-Profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,

    MainLayoutComponent,
    AuthLayoutComponent,
    UserProfileComponent,
    
  ],
  imports: [
    // other modules
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
