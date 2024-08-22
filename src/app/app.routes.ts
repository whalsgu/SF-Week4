import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'account', component: AccountComponent}
];
