import { Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { SignUpComponent } from './components/signup/sign-up/sign-up.component';
import { CategoriesComponent } from './components/Categories/categories/categories.component';
import { ProductsComponent } from './components/Products/products/products.component';
import { Cart } from './components/cart/cart';
import { DetailsComponent } from './components/Details/details/details.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'categories', component: CategoriesComponent, title: 'Categories' },
    { path: 'products', component: ProductsComponent, title: 'Products' },
    { path: 'Details/:id', component: DetailsComponent, title: 'Details' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'signup', component: SignUpComponent, title: 'SignUp' },
    { path: 'cart', component: Cart, title: 'Cart' },
];
