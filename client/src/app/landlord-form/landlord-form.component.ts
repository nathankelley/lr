import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Landlord } from '../landlord';

@Component({
  selector: 'app-landlord-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .landlord-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="landlord-form"
      autocomplete="off"
      [formGroup]="landlordForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Landlord First Name</mat-label>
        <input matInput placeholder="Landlord First Name" formControlName="landlordFirstName" required />
        @if (landlordFirstName.invalid) {
        <mat-error>Landlord First Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Landlord Last Name</mat-label>
        <input matInput placeholder="Landlord Last Name" formControlName="landlordLastName" required />
        @if (landlordLastName.invalid) {
        <mat-error>Landlord Last Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Landlord Address</mat-label>
        <input
          matInput
          placeholder="Landlord Address"
          formControlName="landlordAddress"
          required
        />
        @if (landlordAddress.invalid) {
        <mat-error>Landlord Address must be at least 5 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-radio-group formControlName="landlordThumb" aria-label="Select an option">
        <mat-radio-button name="landlordThumb" value="up" required 
          >Thumbs Up</mat-radio-button
        >
        <mat-radio-button name="landlordThumb" value="down"
          >Thumbs Down</mat-radio-button
        >
      </mat-radio-group>

      <mat-form-field>
        <mat-label>Review</mat-label>
        <input
          matInput
          placeholder="Review"
          formControlName="landlordTextReview"
          required
        />
        @if (landlordTextReview.invalid) {
        <mat-error>Review must be at least 10 characters long.</mat-error>
        }
      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="landlordForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class LandlordFormComponent {
  initialState = input<Landlord>();

  @Output()
  formValuesChanged = new EventEmitter<Landlord>();

  @Output()
  formSubmitted = new EventEmitter<Landlord>();

  landlordForm = this.formBuilder.group({
    landlordFirstName: ['', [Validators.required, Validators.minLength(3)]],
    landlordLastName: ['', [Validators.required, Validators.minLength(3)]],
    landlordAddress: ['', [Validators.required, Validators.minLength(5)]],
    landlordThumb: ['up', [Validators.required]],
    landlordTextReview: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.landlordForm.setValue({
        landlordFirstName: this.initialState()?.landlordFirstName || '',
        landlordLastName: this.initialState()?.landlordLastName || '',
        landlordAddress: this.initialState()?.landlordAddress || '',
        landlordThumb: this.initialState()?.landlordThumb || 'up',
        landlordTextReview: this.initialState()?.landlordTextReview || ''
      });
    });
  }

  get landlordFirstName() {
    return this.landlordForm.get('landlordFirstName')!;
  }
  get landlordLastName() {
    return this.landlordForm.get('landlordLastName')!;
  }
  get landlordAddress() {
    return this.landlordForm.get('landlordAddress')!;
  }
  get landlordThumb() {
    return this.landlordForm.get('landlordThumb')!;
  }
  get landlordTextReview() {
    return this.landlordForm.get('landlordTextReview')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.landlordForm.value as Landlord);
  }
}
