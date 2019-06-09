import {Injectable} from '@angular/core';
import {Board} from '../models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient: HttpClient) {
  }

  save(board: Board): Observable<Board> {
    const method = board.id ? 'PUT' : 'POST';

    return this.httpClient.request<Board>(method, `${environment.baseUrl}/board`, {
      body: board,
      withCredentials: true
    });
  }

  getAll(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${environment.baseUrl}/board/forCurrentUser`, {
      withCredentials: true
    });
  }

  remove(board: Board) {
    return this.httpClient.delete(`${environment.baseUrl}/board/${board.id}`, {
      withCredentials: true
    });
  }

  get(id: number): Observable<Board> {
    return this.httpClient.get<Board>(`${environment.baseUrl}/board/${id}`, {
      withCredentials: true
    });
  }
}
