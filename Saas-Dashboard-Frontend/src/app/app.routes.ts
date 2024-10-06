import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'dashboard',component:DashboardComponent,canActivate: [authGuard]},
    {path:'',redirectTo: '/login', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }