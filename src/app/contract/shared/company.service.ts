import {Company} from './company.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class CompanyService {

  url = environment.RestAPI + '/companies';

  constructor(private http: HttpClient) {  }


  // TODO: Remove
  mockCompany: Company[] = [
    {id: 1, name: 'Mr. Nice0', contactName: 'Contactname0', contactEmail: 'email0', contactPhone: '123'},
    {id: 2, name: 'Mr. Nice1', contactName: 'Contactname1', contactEmail: 'email1', contactPhone: '123'},
    {id: 3, name: 'Mr. Nice2', contactName: 'Contactname2', contactEmail: 'email2', contactPhone: '123'},
    {id: 4, name: 'Mr. Nice3', contactName: 'Contactname3', contactEmail: 'email3', contactPhone: '123'},
    {id: 5, name: 'Mr. Nice4', contactName: 'Contactname4', contactEmail: 'email4', contactPhone: '123'},
  ];

  get(id: number): Observable<Company> {
    return this.http.get<Company>(this.url + '/' + id);
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.url, company);
  }
  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url);
  }
}
