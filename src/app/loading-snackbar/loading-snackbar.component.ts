import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-loading-snackbar',
  standalone: true,
  imports: [MatProgressSpinnerModule,MatSnackBarModule],
  templateUrl: './loading-snackbar.component.html',
  styleUrl: './loading-snackbar.component.css'
})
export class LoadingSnackbarComponent {

}
