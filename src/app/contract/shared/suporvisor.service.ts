import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Suporvisor} from './suporvisor.model';

const url = environment.RestAPI + '/suporvisors';

@Injectable()
export class SuporvisorService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Suporvisor[]> {
    return this.http.get<Suporvisor[]>(url);
  }

  get(id: number): Observable<Suporvisor> {
    return this.http.get<Suporvisor>(url + '/' + id);
  }
}
