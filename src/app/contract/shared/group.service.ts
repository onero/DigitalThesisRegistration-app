import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Group} from './group.model';
import 'rxjs/add/operator/map';

const url = environment.RestAPI + '/groups';

@Injectable()
export class GroupService {

  static getHeader() {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return { headers: headers};
  }

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Group> {
    const header = GroupService.getHeader();
    return this.http.get<Group>(url + '/' + id, header);
  }

  create(email: string): Observable<Group> {
    const header = GroupService.getHeader();
    return this.http.post<Group>(url, {contactEmail: email}, header);
  }

  update(group: Group): Observable<Group> {
    const header = GroupService.getHeader();
    return this.http.put<Group>(url + '/' + group.id, group, header);
  }

}
