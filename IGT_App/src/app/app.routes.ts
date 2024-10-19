import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'userDetails', component: UserDetailsComponent },
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
];
