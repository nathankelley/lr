import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Landlord } from './landlord';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {
  private url = 'http://localhost:5200';
  landlords$ = signal<Landlord[]>([]);
  landlord$ = signal<Landlord>({} as Landlord);
  
  constructor(private httpClient: HttpClient) { }

  private refreshLandlords() {
    this.httpClient.get<Landlord[]>(`${this.url}/landlords`)
      .subscribe(landlords => {
        this.landlords$.set(landlords);
      });
  }

  getLandlords() {
    this.refreshLandlords();
    return this.landlords$();
  }

  getLandlord(id: string) {
    this.httpClient.get<Landlord>(`${this.url}/landlords/${id}`).subscribe(landlord => {
      this.landlord$.set(landlord);
      return this.landlords$();
    });
  }

  createLandlord(landlord: Landlord) {
    return this.httpClient.post(`${this.url}/landlords`, landlord, { responseType: 'text' });
  }

  updateLandlord(id: string, landlord: Landlord) {
    return this.httpClient.put(`${this.url}/landlords/${id}`, landlord, { responseType: 'text' });
  }

  deleteLandlord(id: string) {
    return this.httpClient.delete(`${this.url}/landlords/${id}`, { responseType: 'text' });
  }
}
