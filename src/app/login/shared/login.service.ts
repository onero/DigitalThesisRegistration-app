import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../contract/shared/user.model';

const url = environment.RestLogin + '/login';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  validateUser(user: User): Observable<User> {
    return this.http.post<User>(url, user);
  }

  createGroup(user: UserModel): Observable<UserModel> {
    return this.http.post(url + '/create', user);
  }
}
