import { Routes } from '@angular/router';
import { LandlordsListComponent } from './landlords-list/landlords-list.component';
import { AddLandlordComponent } from './add-landlord/add-landlord.component';
import { EditLandlordComponent } from './edit-landlord/edit-landlord.component';

export const routes: Routes = [
  { path: '', component: LandlordsListComponent, title: 'Landlords List' },
  { path: 'new', component: AddLandlordComponent },
  { path: 'edit/:id', component: EditLandlordComponent },
];
