import {Observable} from 'rxjs/Observable';
import {Contract} from './contract.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
const url = environment.RestAPI + '/contracts';
@Injectable()
export class ContractService {

  constructor(private http: HttpClient) {}

  mockContracts: Contract[] = [
  ];

  getMockContract() {
    return this.mockContracts;
  }

  addContract(contract: Contract) {
    this.mockContracts.push(contract);
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(url, contract);
  }

  getById(groupId: number, projectId: number, companyId: number): Contract {
    const contract = this.mockContracts.find(c => c.companyId === companyId && c.projectId === projectId && c.groupId === groupId);
    return contract;
  }
}
