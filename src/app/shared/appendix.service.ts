import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Appendix} from '../contract/shared/appendix.model';

@Injectable()
export class AppendixService {
  url = environment.RestAPI + '/appendix';

  constructor(private http: HttpClient) { }

  get(): Observable<Appendix> {
    return this.http.get(this.url);
  }
}
