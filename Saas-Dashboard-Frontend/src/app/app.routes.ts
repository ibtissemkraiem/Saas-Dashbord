import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { AuthLayoutComponent } from './layouts/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/layouts/main-layout/main-layout.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';


export const routes: Routes = [
    {
        path: '', // Empty path for non-sidebar pages (login, register)
        component: AuthLayoutComponent, // Auth layout (without sidebar)
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '', // Path for pages that include the sidebar (dashboard, user-statistics)
        component: MainLayoutComponent, // Main layout (with sidebar)
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
            { path: 'profile', component: UserProfileComponent ,canActivate: [authGuard] },
           
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if no route is matched
    { path: '**', redirectTo: '/login' } // Catch-all for invalid routes, redirect to login
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
