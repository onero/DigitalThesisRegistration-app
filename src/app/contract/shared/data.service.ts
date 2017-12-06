import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {Company} from './company.model';
import {environment} from '../../../environments/environment';
import {Contract} from './contract.model';
import {ContractService} from './contract.service';
import {ProjectService} from './project.service';

@Injectable()
export class DataService implements Resolve<any> {

  //     {projectTitle: 'Test', wantedSupervisor: 'Test', assignedSupervisor: 'Test', company: 'Test', status: 'Test'}

  gridviewData = [];

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // return this.http.get('DigitalThesisRegistration-app/src/app/contract/shared/data.service.ts');
    return this.gridviewData;

    // 'DigitalThesisRegistration-app/src/app/contract/shared/contract.model.ts'
  }
}
