import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/authservice';
import { DataTransferService } from '../core/services/data-transfer-service';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { DataListComponent } from '../display/data-list/data-list.component';
import { SearchBarComponent } from '../search/search-bar/search-bar.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DataListComponent,SearchBarComponent,FormsModule,RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title: string = 'Welcome!';
  isLoading = false;
  error = '';
  searchText='';
  selectedTabIndex = 0;

  constructor(
    private authService: AuthService,
    private dataTransfer: DataTransferService,
    private router:Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.error = 'Please log in to access the dashboard';
      return;
    }
  }
  onSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchText } });
    console.log("search from the nav bar initiated");
  }
}
