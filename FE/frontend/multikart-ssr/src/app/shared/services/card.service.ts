import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICard } from 'src/app/pages/account/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  newUserCard(card: ICard) {
    console.log(card)
    return this.http.post<ICard>(`${environment.apiUrl}/cards`, card)
  }
}
