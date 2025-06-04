import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

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

  selectedRowData: any = null;
  showEditPopup = false;
  showConfirmEditPopup = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataservice: DataService,
    private datatransfer: DataTransferService,
    private router: Router
  ) {}

  columnDefs = [
    { field: 'filenumber', headerName: 'File Number', filter: 'agNumberColumnFilter', sortable: true },
    { field: 'firstName', headerName: 'First Name', filter: 'agTextColumnFilter', sortable: true },
    { field: 'middleName', headerName: 'Middle Name', filter: 'agTextColumnFilter', sortable: true },
    { field: 'country', headerName: 'Country', filter: 'agTextColumnFilter', sortable: true },
    { field: 'city', headerName: 'City', filter: 'agTextColumnFilter', sortable: true },
    { field: 'Date_of_birth', headerName: 'Date of Birth', filter: 'agDateColumnFilter', sortable: true },
    { field: 'Gender', headerName: 'Gender', filter: 'agTextColumnFilter', sortable: true }
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  gridapi: any;

  ngOnInit(): void {
    this.http.get<any[]>('assets/sample_data.json').subscribe(data => {
      this.fullData = data;
      console.log("📦 Full data loaded:", this.fullData);

      const transferredData = this.datatransfer.getData();

      if (transferredData && transferredData.length > 0) {
        this.rowData = [...transferredData];
        console.log("🔍 Showing search results:", this.rowData);
      } else {
        this.rowData = [...this.fullData];
        console.log("📋 Showing all data:", this.rowData);
      }
    });
  }

  onGridReady(params: any): void {
    this.gridapi = params.api;
  }

  onRowClicked(event: any): void {
    this.selectedRowData = { ...event.data };
    this.showConfirmEditPopup = true;
  }

  openEditForm(): void {
    if (this.selectedRowData && this.selectedRowData.filenumber) {
      this.datatransfer.setData(this.selectedRowData);
      this.showConfirmEditPopup = false;
      this.router.navigate(['/edit']);
    }
  }

  closeConfirmEditPopup(): void {
    this.showConfirmEditPopup = false;
    this.selectedRowData = null;
  }

  closePopup(): void {
    this.showEditPopup = false;
    this.selectedRowData = null;
  }

  onPaginationChanged(event: any): void {
    const currentPage = event.api.paginationGetCurrentPage() + 1;
    const totalPages = event.api.paginationGetTotalPages();
    console.log(`Page changed: Page ${currentPage} of ${totalPages}`);
  }
}
