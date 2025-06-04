import { Component, Input, input, OnInit } from '@angular/core';
// import { DataService } from './dataservice';
// import { DataEntry } from './models/data-entry.model';
  import { NavigationEnd, Router,RouterModule,RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { SearchBarComponent } from "./search/search-bar/search-bar.component";
import { DataListComponent } from "./display/data-list/data-list.component";
import { DataEditorComponent } from "./edit/data-editor/data-editor.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatInputModule, SearchBarComponent, DataListComponent, DataEditorComponent, RouterOutlet, RouterModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log('Navigated to:', (event as NavigationEnd).urlAfterRedirects);
    });
  }

}