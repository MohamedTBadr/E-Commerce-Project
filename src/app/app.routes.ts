import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { HomeComponent } from './components/Home/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'signup', component: Signup, title: 'SignUp' },
];
