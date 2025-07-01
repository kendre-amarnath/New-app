import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'C:/Users/285495/Desktop/Task/New-app/src/app/core/services/dataservice';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTransferService } from 'C:/Users/285495/Desktop/Task/New-app/src/app/core/services/data-transfer-service';



@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() tabKey: string = '';
  searchText: string = '';
  searchSubscription!: Subscription;

  rowData:any[] = []; 
  searchResults: any[] = [];
  allUsers: any[] = []
 
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,private dataservice:DataService,private datatransfer:DataTransferService,private router:Router
  ) {}
  
  // @Output() search = new EventEmitter<string>();
  //@Output() searchChanged:EventEmitter<any[]> = new EventEmitter<any[]>(); // Emits filtered results@Input()


  // dataSender(){
  //   this.searchChanged.emit(this.rowData);
  // }



  overlayNoRowsTemplate: string|undefined;
  ngOnInit(): void {
    this.dataservice.getUserData().subscribe(data => {
      this.allUsers = data;
      this.rowData = [...data];
  
      if (!data || data.length === 0) {
        console.warn('No data returned from DataService.');
        return;
      }
  
      this.route.queryParams.subscribe(params => {
        const query = (params['q'] || '').trim().toLowerCase();
        if (query) {
          this.searchText = query;
          this.search(query);
        } else {
          const transferred = this.datatransfer.getData();
          this.rowData = transferred?.length ? [...transferred] : [...this.allUsers];
          if (!transferred || transferred.length === 0) {
            this.datatransfer.setData(this.rowData);
          }
        }
      });
    });
  }

  onSearch(): void {
    const trimmed = this.searchText.trim().toLowerCase();
    this.dataservice.setSearchQueryForTab(this.tabKey, trimmed);
  }
  
  search(query: string): void {
    const trimmedQuery = (query || '').trim().toLowerCase();
    console.log('Searching for:', trimmedQuery);

    if (!Array.isArray(this.allUsers) || this.allUsers.length === 0) {
      console.warn('User data is not loaded or empty.');
      this.rowData = [];
      this.searchResults = [];
      return;
    }
  
    if (!trimmedQuery) {
      this.rowData = [...this.allUsers];
      this.searchResults = [...this.allUsers];
      this.overlayNoRowsTemplate = '';

      this.router.navigate(['/dashboard']);

      return;
    }
  
    const isNumeric = !isNaN(Number(trimmedQuery));
  
    this.searchResults = this.allUsers.filter(user => {
      if (isNumeric) {
        return user.filenumber === trimmedQuery;
      } else {
        return user.firstName?.toLowerCase().includes(trimmedQuery);
      }
    });
    console.log(this.searchResults)
  
    this.rowData = [...this.searchResults];
  
    if (this.rowData.length === 0) {
      this.overlayNoRowsTemplate = `
        <span style="padding: 10px; border: 1px solid #ccc;">No results found</span>
      `;
    } else {
      this.overlayNoRowsTemplate = '';
    }
    this.datatransfer.setData(this.searchResults);
    console.log("the data is saved",this.datatransfer.getData());
    this.router.navigate(['/dashboard']);

  }
  goToDisplayPage() {
 

}
  }