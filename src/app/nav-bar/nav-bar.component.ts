import { Component } from '@angular/core';
import { DataService } from '../core/services/dataservice';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatToolbarModule,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  searchText = '';

  constructor(private dataservice: DataService,private router:Router) {}

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchText } });
    console.log("search from the nav bar initiated");
  }

}

