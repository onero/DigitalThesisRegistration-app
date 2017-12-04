import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {Observable} from 'rxjs/Observable';

const url = environment.RestLogin + '/login';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  validateUser(user: User): Observable<string> {
    return this.http.post<string>(url, user);
  }
}
