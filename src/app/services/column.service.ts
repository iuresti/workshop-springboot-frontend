import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Column} from '../models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private httpClient: HttpClient) {
  }

  save(column: Column): Observable<Column> {
    const method = column.id ? 'PUT' : 'POST';

    return this.httpClient.request<Column>(method, `${environment.baseUrl}/column`, {
      body: column,
      withCredentials: true
    });
  }

  getByBoard(idBoard: number): Observable<Column[]> {
    return this.httpClient.get<Column[]>(`${environment.baseUrl}/column/board/${idBoard}`, {
      withCredentials: true
    });
  }

  remove(column: Column) {
    return this.httpClient.delete(`${environment.baseUrl}/column/${column.id}`, {
      withCredentials: true
    });
  }
}
