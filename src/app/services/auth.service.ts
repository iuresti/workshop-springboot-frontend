import {Injectable} from '@angular/core';
import {User} from '../models';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ACCESS_TOKEN = 'ACCESS_TOKEN';
  private accessToken: string;
  private loggedUser: User;

  constructor(private httpClient: HttpClient) {
    this.accessToken = sessionStorage.getItem(this.ACCESS_TOKEN);
    this.loggedUser = this.buildUser(this.accessToken);
  }

  private buildUser(accessToken: string): User {
    if (accessToken) {
      accessToken = accessToken.split('.')[1];
      const userInfo: any = JSON.parse(atob(accessToken));
      this.loggedUser = new User();

      this.loggedUser.username = userInfo.user_name;
      this.loggedUser.name = userInfo.name;
      this.loggedUser.authorities = userInfo.authorities;
      this.loggedUser.email = userInfo.email;

      return this.loggedUser;
    }
    return null;
  }

  public get user(): User {
    return this.loggedUser;
  }

  public get token(): string {
    return this.accessToken;
  }

  login(username: string, password: string): Observable<User> {
    const urlEndpoint = `${environment.baseUrl}/authenticate`;
    const loginInfo = {
      username,
      password
    };


    return this.httpClient.post<{token: string, expiresIn: number}>(urlEndpoint, loginInfo, {withCredentials: false})
      .pipe(
        tap(response => {
          console.log(response);
          this.accessToken = response.token;
          sessionStorage.setItem(this.ACCESS_TOKEN, this.accessToken);
        }),
        map(() => {
          this.loggedUser = this.buildUser(this.accessToken);

          return this.loggedUser;
        }));
  }

  public isAuthenticated(): boolean {
    return this.loggedUser != null;
  }

  public logout() {
    sessionStorage.clear();
    this.accessToken = null;
    this.loggedUser = null;
  }

  public hasRole(roleName: string): boolean {
    if (!roleName.startsWith('ROLE_')) {
      roleName = 'ROLE_' + roleName;
    }

    return this.loggedUser && this.loggedUser.authorities && this.loggedUser.authorities.includes(roleName);
  }

  public isExpired(): boolean {
    if (this.accessToken) {
      const now = new Date().getTime() / 1000;
      const tokenInfo: any = JSON.parse(atob(this.accessToken.split('.')[1]));

      return tokenInfo.exp < now;
    }

    return false;
  }
}
