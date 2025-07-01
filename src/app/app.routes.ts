import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DataEditorComponent } from './edit/data-editor/data-editor.component';
import { DataListComponent } from './display/data-list/data-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './core/services/auth-gaurdservice';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
export const routes: Routes = [
    { path:'dashboard', component: DashboardComponent, canActivate: [AuthGaurdService]},
    { path:'register', component: RegisterComponent },
   {path: 'search', component: SearchBarComponent },
    { path: 'login', component: LoginComponent},
    { path: 'display', component: DataListComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {path: 'edit', component: DataEditorComponent }
];
