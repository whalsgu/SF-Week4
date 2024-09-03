import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'account', component: AccountComponent},
    {path: 'profile', component: ProfileComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
