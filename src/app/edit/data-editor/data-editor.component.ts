
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/dataservice';
import { DataTransferService } from '../../core/services/data-transfer-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-data-editor',
  standalone: true,
  imports: [ CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule],
  templateUrl: './data-editor.component.html',
  styleUrl: './data-editor.component.css'
})
export class DataEditorComponent implements OnInit {
back() {
  this.router.navigate(['/display']);
}
  filenumber!: number;
  form!: FormGroup;
  isEditing = false;
  selectedUser: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataservice: DataService,
    private datatransfer: DataTransferService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedUser = this.datatransfer.getData();
    if (!this.selectedUser) {
      console.warn('No user data received. Redirecting back.');
      this.router.navigate(['/']);
      return;
    }
    this.filenumber = this.selectedUser.filenumber;

    this.form = this.fb.group({
      firstName: [this.selectedUser.firstName],
      middleName: [this.selectedUser.middleName],
      country: [this.selectedUser.country],
      city: [this.selectedUser.city],
      dateOfBirth: [this.selectedUser.dateOfBirth],
      gender: [this.selectedUser.gender]
    });
  }

  enableEditing() {
    this.isEditing = true;
  }

  onSubmit() {
    const updatedData = {
      filenumber: this.filenumber,
      ...this.form.value
    };
    console.log('Updated data:', updatedData);
    alert('Updated successfully!');
    this.selectedUser = updatedData;
    this.isEditing = false;
  }
}