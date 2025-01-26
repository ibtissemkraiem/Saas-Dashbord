import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { AuthLayoutComponent } from './layouts/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/layouts/main-layout/main-layout.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
//import { EditProfileComponent } from './user-profile/Edit-Profile/edit-profile/edit-profile.component';


export const routes: Routes = [
    {
        path: '', 
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '', 
        component: MainLayoutComponent, 
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
            { path: 'profile/:id', component: UserProfileComponent ,canActivate: [authGuard] },
            { path: 'users', component: UsersListComponent ,canActivate: [authGuard] },
           // { path: 'EditProfile/:id', component: EditProfileComponent ,canActivate: [authGuard] },
           
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: '**', redirectTo: '/login' } 
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
