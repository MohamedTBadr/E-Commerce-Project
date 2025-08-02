import { Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignUpComponent } from './components/signup/sign-up/sign-up.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'signup', component: SignUpComponent, title: 'SignUp' },
];
