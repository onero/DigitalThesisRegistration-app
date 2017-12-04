import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';

const url = environment.RestAPI + '/login';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  mock: User[] = [{
    userName: 'user',
    password: '123'}];

  mockLoginValidate(user: User): boolean {
  const mock = this.mock.find(u => u.userName === user.userName && u.password === user.password);
    if (mock != null) {
      localStorage.setItem('LoggedIn', 'true');
      console.log(mock + 'You are logged in');
      return true;
    } else {
      console.log('Du failede din newb');
      return false;
    }
  }
}
