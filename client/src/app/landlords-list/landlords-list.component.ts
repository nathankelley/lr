import { Component, OnInit, WritableSignal } from '@angular/core';
import { Landlord } from '../landlord';
import { LandlordService } from '../landlord.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landlords-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Landlord List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="landlords$()">
          <ng-container matColumnDef="col-landlordName">
            <th mat-header-cell *matHeaderCellDef>Landlord Name</th>
            <td mat-cell *matCellDef="let element">{{ element.landlordName }}</td>
          </ng-container>
          <ng-container matColumnDef="col-landlordAddress">
            <th mat-header-cell *matHeaderCellDef>Landlord Address</th>
            <td mat-cell *matCellDef="let element">{{ element.landlordAddress }}</td>
          </ng-container>
          <ng-container matColumnDef="col-landlordThumb">
            <th mat-header-cell *matHeaderCellDef>Thumbs</th>
            <td mat-cell *matCellDef="let element">{{ element.landlordThumb }}</td>
          </ng-container>
          <ng-container matColumnDef="col-landlordTextReview">
            <th mat-header-cell *matHeaderCellDef>Review</th>
            <td mat-cell *matCellDef="let element">{{ element.landlordTextReview }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteLandlord(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Landlord
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class LandlordsListComponent implements OnInit {
  landlords$ = {} as WritableSignal<Landlord[]>;
  displayedColumns: string[] = [
    'col-landlordName',
    'col-landlordAddress',
    'col-landlordThumb',
    'col-landlordTextReview',
    'col-action',
  ];

  constructor(private landlordsService: LandlordService) {}

  ngOnInit() {
    this.fetchLandlords();
  }

  deleteLandlord(id: string): void {
    this.landlordsService.deleteLandlord(id).subscribe({
      next: () => this.fetchLandlords(),
    });
  }

  private fetchLandlords(): void {
    this.landlords$ = this.landlordsService.landlords$;
    this.landlordsService.getLandlords();
  }
}
