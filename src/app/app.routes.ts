import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component'; // Make sure this path is correct

export const routes: Routes = [
   {path: 'details/:filenumber', component: DetailsComponent } 
];
