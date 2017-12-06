import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {Company} from './company.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class DataService implements Resolve<any> {

  url = environment.RestAPI + '/companies';

  constructor(private http: HttpClient) {
  }

  // TODO: Remove
  mockCompany: Company[] = [
    {id: 1, name: 'Mr. Nice0', contactName: 'Contactname0', contactEmail: 'email0', contactPhone: '123'},
    {id: 2, name: 'Mr. Nice1', contactName: 'Contactname1', contactEmail: 'email1', contactPhone: '123'},
    {id: 3, name: 'Mr. Nice2', contactName: 'Contactname2', contactEmail: 'email2', contactPhone: '123'},
    {id: 4, name: 'Mr. Nice3', contactName: 'Contactname3', contactEmail: 'email3', contactPhone: '123'},
    {id: 5, name: 'Mr. Nice4', contactName: 'Contactname4', contactEmail: 'email4', contactPhone: '123'},
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('TESTING123 IT WORKS!!!');
    // return this.http.get('DigitalThesisRegistration-app/src/app/contract/shared/data.service.ts');
    return this.mockCompany;
    // 'DigitalThesisRegistration-app/src/app/contract/shared/contract.model.ts'
  }
}
