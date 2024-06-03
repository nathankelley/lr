import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandlordFormComponent } from '../landlord-form/landlord-form.component';
import { Landlord } from '../landlord';
import { LandlordService } from '../landlord.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-landlord',
  standalone: true,
  imports: [LandlordFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Landlord</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-landlord-form
          (formSubmitted)="addLandlord($event)"
        ></app-landlord-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddLandlordComponent {
  constructor(
    private router: Router,
    private landlordService: LandlordService
  ) {}

  addLandlord(landlord: Landlord) {
    this.landlordService.createLandlord(landlord).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create landlord');
        console.error(error);
      },
    });
    this.landlordService.getLandlords();
  }
}
