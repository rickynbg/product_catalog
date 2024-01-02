import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { CatalogComponent } from './pages/catalog/catalog.component'
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: CatalogComponent
    },
    // { path: '',   redirectTo: '/products', pathMatch: 'full' },
    {
        path: 'login',
        title: 'Log In',
        component: LoginComponent,
    },
    {
        path: 'signup',
        title: 'Sign Up',
        component: SignupComponent,
    },
    {
        path: 'users',
        title: 'Users Manages',
        component: UserComponent,
    },
    {
        path: 'products',
        title: 'Products Manage',
        component: ProductComponent,
    },
];
