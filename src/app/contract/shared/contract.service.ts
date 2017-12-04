import {Observable} from 'rxjs/Observable';
import {Contract} from './contract.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ProjectService} from './project.service';
const url = environment.RestAPI + '/contracts';
@Injectable()
export class ContractService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Contract[]> {
    const contracts = this.http.get<Contract[]>(url);
    return contracts;
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(url, contract);
  }

  getById(groupId: number, projectId: number, companyId: number): Contract {
    return null;
  }
}
