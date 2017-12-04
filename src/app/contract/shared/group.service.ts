import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Group} from './group.model';
import 'rxjs/add/operator/map';

const url = environment.RestAPI + '/groups';

@Injectable()
export class GroupService {
  constructor(private http: HttpClient) { }

  get(id: number): Observable<Group> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const options = { headers: headers};

    return this.http.get<Group>(url + '/' + id, options);
  }

  create(email: string): Observable<Group> {
  return this.http.post<Group>(url, {contactEmail: email});
  }

  update(group: Group): Observable<Group> {
    return this.http.put<Group>(url + '/' + group.id, group);
  }

}
