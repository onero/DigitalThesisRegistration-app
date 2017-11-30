import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Supervisor} from './supervisor.model';

const url = environment.RestAPI + '/supervisors';

@Injectable()
export class SupervisorService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(url);
  }

  get(id: number): Observable<Supervisor> {
    return this.http.get<Supervisor>(url + '/' + id);
  }
}
