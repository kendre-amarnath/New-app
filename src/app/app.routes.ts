import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { DataEditorComponent } from './edit/data-editor/data-editor.component';
import { DataListComponent } from './display/data-list/data-list.component';
export const routes: Routes = [
    { path: 'search', component: SearchBarComponent },
    { path:'',component:DataListComponent},
    {
         path:'display',component:DataListComponent
    },
    { path: 'edit', component: DataEditorComponent },
    { path: '**', redirectTo: '' }

    
    
];
