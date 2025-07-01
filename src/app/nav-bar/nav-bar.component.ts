import { Component } from '@angular/core';
import { DataService } from '../core/services/dataservice';
import { Router, UrlSegment } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTransferService } from '../core/services/data-transfer-service';
import { AuthService } from '../core/services/authservice';
import { Subscription } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatToolbarModule,FormsModule,MatSidenavModule,MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
display() {
  this.router.navigate(['']);
}

  username:string='';
  isLoggedIn: boolean = false;
  private authSubscription: Subscription | null = null;

  
  constructor(private dataservice: DataService,private router:Router,private dataTransfer:DataTransferService,public authService: AuthService) {}
  ngOnInit(){
    this.dataTransfer.username$.subscribe(name => {
      this.username = name;
      console.log('Received username in NavBar:', this.username);
    });
  }
  showUserDrawer = false;

  toggleUserDrawer() {
    this.showUserDrawer = !this.showUserDrawer;
  }
  
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.toggleUserDrawer()
    this.router.navigate(['/login']);
  }

}

