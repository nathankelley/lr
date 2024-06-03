import { Component, OnInit, WritableSignal } from '@angular/core';
import { LandlordFormComponent } from '../landlord-form/landlord-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Landlord } from '../landlord';
import { LandlordService } from '../landlord.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-landlord',
  standalone: true,
  imports: [LandlordFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Landlord</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-landlord-form
          [initialState]="landlord()"
          (formSubmitted)="editLandlord($event)"
        ></app-landlord-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditLandlordComponent implements OnInit {
  landlord = {} as WritableSignal<Landlord>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private landlordService: LandlordService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.log('No id provided');
    }

    this.landlordService.getLandlord(id!);
    this.landlord = this.landlordService.landlord$;
  }

  editLandlord(landlord: Landlord) {
    this.landlordService
      .updateLandlord(this.landlord()._id || '', landlord)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log('Failed to update Landlord');
          console.error(error);
        },
      });
  }
}
