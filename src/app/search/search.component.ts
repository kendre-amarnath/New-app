import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  data: any[] = [];
  selectedRecord: any = null;
  message: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
        this.message = 'Error loading data. Please try again later.';
        console.error('Error fetching data:', err);
      }
    });
  }

  search() {
    this.message = '';
    this.selectedRecord = null;

    const input = this.searchControl.value?.toString().trim();
    if (!input) {
      this.message = 'Please enter a file number.';
      return;
    }

    const foundRecord = this.data.find(item => item.filenumber.toString() === input);
    this.selectedRecord = foundRecord;
    this.message = foundRecord ? '' : 'No data found or invalid file number!';
  }
}