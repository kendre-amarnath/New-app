
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
  showAddress2: boolean = false;
showPhone2: boolean = false;

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
    console.log("selected user",this.selectedUser);
    if (!this.selectedUser) {
      console.warn('No user data received. Redirecting back.');
      this.router.navigate(['/']);
      return;
    }

    this.form = this.fb.group({
  
      firstName: [this.selectedUser?.firstName],
      lastName: [this.selectedUser?.lastName],
      gender: [this.selectedUser?.gender],
      dateOfBirth: [this.selectedUser?.dateOfBirth],
      address1: [this.selectedUser?.address1],
      address2: [this.selectedUser?.address2],
      phone1: [this.selectedUser?.phoneNumber1],
      phone2: [this.selectedUser?.phoneNumber2]

    });
    console.log(this.form);
  }

  enableEditing() {
    this.isEditing = true;
  }
  loading=false;
  onSubmit() {
    const fileNumber = this.selectedUser?.fileNumber;
  
    if (!fileNumber) {
      console.error("File number is missing!");
      return;
    }
  
    const updatedData = {
      filenumber: fileNumber,
      ...this.form.value
    };
  
   //this.loading = true;
    this.dataservice.updateUserByFileNumber(fileNumber, updatedData).subscribe({
      next: () => {
        console.log(updatedData);
        this.selectedUser = updatedData;
        this.isEditing = false;
        this.showSuccessPopup = true;
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update user.');
      },
      complete: () => {
       //this.loading = false;
      }
    });
  }
  
  
  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }
  
  
  goBack() {
    history.back(); 
  }
  
}