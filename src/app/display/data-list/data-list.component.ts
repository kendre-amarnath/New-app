import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import type { GridApi } from 'ag-grid-community';
import { DataService } from '../../core/services/dataservice';
import { DataTransferService } from '../../core/services/data-transfer-service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [
    CommonModule, JsonPipe, FormsModule,
    AgGridAngular, MatButtonModule, NgIf,
    MatToolbarModule, RouterOutlet, RouterLink
  ],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css'
})
export class DataListComponent implements OnInit {
  fullData: any[] = [];
  rowData: any[] = [];
  gridapi!: GridApi;
  @Input() tabId!: string;


  selectedRowData: any = null;
  showEditPopup = false;
  showConfirmEditPopup = false;
  isEditing = false;
overlayNoRowsTemplate: string|undefined;

  constructor(
    private route: ActivatedRoute,
    private dataservice: DataService,
    private datatransfer: DataTransferService,
    private router: Router,
    private cd: ChangeDetectorRef

  ) {}

  columnDefs = [
    { field: 'fileNumber', headerName: 'File Number', filter: 'agTextColumnFilter', sortable: true },
    { field: 'firstName', headerName: 'First Name', filter: 'agTextColumnFilter', sortable: true },
    { field: 'lastName', headerName: 'Last Name', filter: 'agTextColumnFilter', sortable: true },
    { field: 'gender', headerName: 'Gender', filter: 'agTextColumnFilter', sortable: true },
    { field: 'dateOfBirth', headerName: 'Date of Birth', filter: 'agDateColumnFilter', sortable: true },
   
    {
      headerName: 'Address',
      tooltipValueGetter: (params:any) => {
        const a1 = params.data.address1 || 'N/A';
        const a2 = params.data.address2 || 'N/A';
        return `Address 1: ${a1}\nAddress 2: ${a2}`;
      },
      cellRenderer: (params:any) => {
        const a1 = params.data.address1 || '';
        const a2 = params.data.address2 || '';
        return `
          <div style="padding: 4px 8px; font-size: 13px;">
            <strong></strong> ${a1}<br>
            <strong></strong> ${a2}
          </div>
        `;
      }
    },
  
    {
      headerName: 'Phone Number',
      tooltipValueGetter: (params:any) => {
        const p1 = params.data.phoneNumber1 || 'N/A';
        const p2 = params.data.phoneNumber2 || 'N/A';
        return `Phone 1: ${p1}\nPhone 2: ${p2}`;
      },
      cellRenderer: (params:any) => {
        const p1 = params.data.phoneNumber1 || '';
        const p2 = params.data.phoneNumber2 || '';
        return `
          <div style="padding: 4px 8px; font-size: 13px;">
            <strong></strong> ${p1}<br>
            <strong></strong> ${p2}
          </div>
        `;
      }
    },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        container.className = 'Buttons_Container';

          const editButton = document.createElement('button');
          editButton.innerText = '✏️';
          editButton.className = 'btn-edit';
          editButton.addEventListener('click', (event) => {
         
            params.context.componentParent.onClick(params);
            console.log('Edit button clicked', params.data);
          });

          const deleteButton = document.createElement('button');
          deleteButton.innerText = '🗑️';
          deleteButton.className = 'btn-delete';
          deleteButton.addEventListener('click', () => {
            params.context.componentParent.onDeleteClicked(params)
          });

        container.appendChild(editButton);
        container.appendChild(deleteButton);
        return container;
      },
    },
  
  ];
  
  searchText = '';

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
  };


  ngOnInit(): void {
    this.dataservice.getUserData().subscribe(data => {
      this.fullData = data;
      console.log("Full data loaded:", this.fullData);
      const transferredData = this.datatransfer.getData();
  
      if (this.tabId === 'view') {
        this.rowData = [];
        this.datatransfer.setRowData([]);
        this.overlayNoRowsTemplate = `<span style="padding: 10px; border: 1px solid #ccc;">Please search to view results.</span>`;
      }
      else if (transferredData && transferredData.length > 0) {
        this.rowData = [...transferredData];
        console.log("Showing search results:", this.rowData);
      } else {
        this.rowData = [...this.fullData];
        this.datatransfer.setRowData(this.rowData);
        console.log("Showing all data:", this.rowData);
      }
    });
  
    this.dataservice.getSearchQueryForTab(this.tabId).subscribe(query => {
      this.applyFilter(query);
    });
  
    console.log("tabid", this.tabId);
  }
  
  
  applyFilter(query: string): void {
    const trimmedQuery = (query || '').trim().toLowerCase();
    console.log("the tab id is:",this.tabId);
    //this.loading = true;

  
    if (!trimmedQuery && this.tabId!="view") {
      this.dataservice.getUserData().subscribe(data => {
        const users = Array.isArray(data) ? data : [];
        this.rowData = [...users];
        this.overlayNoRowsTemplate = '';
        this.datatransfer.setData(this.rowData);
      });
      return;
    }
  
    this.dataservice.getUserByFileNumber(trimmedQuery).subscribe({
      next: (data) => {
        if (data) {
          this.rowData = [data];  
          this.overlayNoRowsTemplate = '';
        } else {
          this.rowData = [];
          this.overlayNoRowsTemplate = `<span style="padding: 10px; border: 1px solid #ccc;">No results found</span>`;
        }
        this.datatransfer.setData(this.rowData);
      },
      error: (err) => {
        console.error('Search error:', err);
        this.rowData = [];
        this.overlayNoRowsTemplate = `<span style="padding: 10px; border: 1px solid #ccc;">No results found</span>`;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  

  onGridReady(params: any): void {
    this.gridapi = params.api;
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
    // this.dataservice.getUserData().subscribe(data => {
    //   console.log("Initial data:", data);

    //   this.rowData = data;
    //   this.fullData = data;
    // });
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
    this.gridapi.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      this.gridapi.sizeColumnsToFit();
    });
  }

  onClick(event: any):void {
   
    this.selectedRowData = { ...event.data }; 
    this.showConfirmEditPopup = true;
    this.cd.detectChanges(); 

  }

  onRowDoubleClicked(event: any):void {
    const targetElement = event.event.target as HTMLElement;
    if (targetElement.tagName === 'SELECT' || targetElement.closest('select')) {
      return;
    }

    this.selectedRowData = { ...event.data };
    this.showConfirmEditPopup = true;
  }
  
  openEditForm(): void {
    if (this.selectedRowData && this.selectedRowData.fileNumber) {
      this.datatransfer.setData(this.selectedRowData);
      this.showConfirmEditPopup = false;
      this.router.navigate(['/edit']);
      console.log("navigated to the edit page from the data list component");
    }
  }

  closeConfirmEditPopup(): void {
    this.showConfirmEditPopup = false;
    this.cd.detectChanges(); 

    this.selectedRowData = null;
  }

  closePopup(): void {
    this.showEditPopup = false;
    this.selectedRowData = null;
    this.deletePopup=false;
  }

  
  onPaginationChanged(event: any): void {
    const currentPage = event.api.paginationGetCurrentPage() + 1;
    const totalPages = event.api.paginationGetTotalPages();
    console.log(`Page changed: Page ${currentPage} of ${totalPages}`);
  }
  deletePopup=false;
  rowToDelete: any = null;
  loading =false;
  onDeleteClicked(event: any) {
    const fileNumber = event.data?.fileNumber;
    if (!fileNumber) return;
  
    this.rowToDelete = event.data;
    this.deletePopup = true;
    this.cd.detectChanges();
 }
 closeConfirmDeletePopup(): void {
  this.deletePopup=false;
  this.cd.detectChanges(); 

  this.selectedRowData = null;

 }
  deleteRecord():void{
    if (!this.rowToDelete?.fileNumber) return;
   
    this.loading = true;

    const fileNumber = this.rowToDelete.fileNumber;
  
    this.dataservice.deleteUserByFileNumber(fileNumber).subscribe({
      next: () => {
        this.rowData = this.rowData.filter(item => item.fileNumber !== fileNumber);
        this.deletePopup = false;
        this.rowToDelete = null;
        this.cd.detectChanges(); 

        alert('User deleted successfully.');
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Error deleting user.');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}


