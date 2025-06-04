
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
  // showSuccessPopup = false;

  // filenumber!: number;
  // form!: FormGroup;
  // isEditing = false;
  // selectedUser: any;
  // isSubmitted = false; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataservice: DataService,
    private datatransfer: DataTransferService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  // ngOnInit(): void {
  //   this.selectedUser = this.datatransfer.getData();
  //   if (!this.selectedUser) {
  //     console.warn('No user data received. Redirecting back.');
  //     this.router.navigate(['/']);
  //     return;
  //   }
  //   this.filenumber = this.selectedUser.filenumber;

  //   this.form = this.fb.group({
  //     firstName: [this.selectedUser.firstName],
  //     middleName: [this.selectedUser.middleName],
  //     country: [this.selectedUser.country],
  //     city: [this.selectedUser.city],
  //     dateOfBirth: [this.selectedUser.dateOfBirth],
  //     gender: [this.selectedUser.gender]
  //   });
  // }
  // // closeSuccessPopup() {
  // //   this.showSuccessPopup = false;
  // // }

  // // enableEditing() {
  // //   this.isEditing = true;
  // // }

  // // onSubmit() {
  // //   const updatedData = {
  // //     filenumber: this.filenumber,
  // //     ...this.form.value
  // //   };
  // //   this.isSubmitted = true; 
  // //   console.log('Updated data:', updatedData);
  // //   //alert('Updated successfully!');
  // //   this.selectedUser = updatedData;
  // //   this.isEditing = false;
  // // }
  
  // enableEditing() {
  //   this.isEditing = true;
  // }
  
  // onSubmit() {
  //   const updatedData = {
  //     filenumber: this.filenumber,
  //     ...this.form.value
  //   };
  
  //   this.selectedUser = updatedData;
  //   this.isEditing = false;
  //   this.showSuccessPopup = true; 
  // }
  // closeSuccessPopup() {
  //   this.showSuccessPopup = false;
  // }
  
  
  // goBack() {
  //   history.back(); 
  // }

  isSubmitted = false; 
  filenumber!: number;
  form!: FormGroup;
  isEditing = false;
  selectedUser: any;
  showSuccessPopup = false;

  // mockData = [
  //   {
  //     filenumber: 239663,
  //     firstName: 'Manu',
  //     middleName: 'Ramachandran',
  //     country: 'India',
  //     city: 'Bangalore',
  //     dateOfBirth: '1995-10-10',
  //     gender: 'Male'
  //   }
  // ];

 // constructor(private route: ActivatedRoute, private fb: FormBuilder,private ) {}

  ngOnInit(): void {
    this.filenumber = +this.route.snapshot.paramMap.get('filenumber')!;
    //this.selectedUser = this.selectedUser.find(u=> u.filenumber === this.filenumber);
 
    this.selectedUser = this.datatransfer.getData();
    if (!this.selectedUser) {
      console.warn('No user data received. Redirecting back.');
      this.router.navigate(['/']);
      return;
    }

    this.form = this.fb.group({
      firstName: [this.selectedUser?.firstName],
      middleName: [this.selectedUser?.middleName],
      country: [this.selectedUser?.country],
      city: [this.selectedUser?.city],
      dateOfBirth: [this.selectedUser?.Date_of_birth],
      gender: [this.selectedUser?.Gender]

    });
    console.log(this.form);
  }
  // formatDateToInput(date: string | Date): string {
  //   const d = new Date(date);
  //   return d.toISOString().split('T')[0]; // "yyyy-MM-dd"
  // }
  enableEditing() {
    this.isEditing = true;
  }
  
  onSubmit() {
    const updatedData = {
      filenumber: this.filenumber,
      ...this.form.value
    };
  
    this.selectedUser = updatedData;
    this.isEditing = false;
    this.showSuccessPopup = true; 
  }
  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }
  
  
  goBack() {
    history.back(); 
  }
  
}