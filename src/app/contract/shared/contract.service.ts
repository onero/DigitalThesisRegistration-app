import {Observable} from 'rxjs/Observable';
import {Contract} from './contract.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class ContractService {

  url = environment.RestAPI + '/contracts';

  constructor(private http: HttpClient) {}

  mockContracts: Contract[] = [
    {title: 'Mr. Nice', groupId: 1, projectId: 1, companyId: 1},
    {title: 'Mr. Nice1', groupId: 2, projectId: 2, companyId: 2},
    {title: 'Mr. Nice2', groupId: 3, projectId: 3, companyId: 3},
    {title: 'Mr. Nice3', groupId: 4, projectId: 4, companyId: 4},
    {title: 'Mr. Nice4', groupId: 5, projectId: 5, companyId: 5},
  ];

  getMockContract() {
    return this.mockContracts;
  }

  addContract(contract: Contract) {
    this.mockContracts.push(contract);
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.url, contract);
  }

  getById(groupId: number, projectId: number, companyId: number): Contract {
    const contract = this.mockContracts.find(c => c.companyId === companyId && c.projectId === projectId && c.groupId === groupId);
    return contract;
  }
}
