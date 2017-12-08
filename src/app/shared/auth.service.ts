import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('Token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    // Returns a boolean reflecting whether or not the token is expired.
    return tokenNotExpired(null, token);
  }
}
