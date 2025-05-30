import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  filenumber!: number;
  form!: FormGroup;
  isEditing = false;
  selectedUser: any;

  mockData = [
    {
      filenumber: 239663,
      firstName: 'Manu',
      middleName: 'Ramachandran',
      country: 'India',
      city: 'Bangalore',
      dateOfBirth: '1995-10-10',
      gender: 'Male'
    }
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filenumber = +this.route.snapshot.paramMap.get('filenumber')!;
    this.selectedUser = this.mockData.find(u => u.filenumber === this.filenumber);

    this.form = this.fb.group({
      firstName: [this.selectedUser?.firstName],
      middleName: [this.selectedUser?.middleName],
      country: [this.selectedUser?.country],
      city: [this.selectedUser?.city],
      dateOfBirth: [this.selectedUser?.dateOfBirth],
      gender: [this.selectedUser?.gender]
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
