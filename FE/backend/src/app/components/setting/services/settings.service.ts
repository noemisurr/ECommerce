import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getSettings() {
    return this.http.get('http://localhost:8000/api/backoffice/settings')
  }

  updateSettings(email: string, address: string, city: string, postal_code: string, telephone: string) {
    return this.http.put('http://localhost:8000/api/backoffice/settings/1', {email, address, city, postal_code, telephone})
  }
}
