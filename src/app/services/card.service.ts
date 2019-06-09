import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board, Card, Column} from '../models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) {
  }

  save(card: Card): Observable<Card> {
    return this.httpClient.post<Card>(`${environment.baseUrl}/card`, card, {
      withCredentials: true
    });
  }

  getByColumn(idColumn: number): Observable<Card[]> {
    return this.httpClient.get<Card[]>(`${environment.baseUrl}/card/column/${idColumn}`, {
      withCredentials: true
    });
  }
}
