import {Observable} from 'rxjs/Observable';
import {Contract} from './contract.model';

export class ContractService {

  getMockContract() {
    const mock: Contract[] = [
      {title: 'Mr. Nice'},
      {title: 'Mr. Nice1'},
      {title: 'Mr. Nice2'},
      {title: 'Mr. Nice3'},
      {title: 'Mr. Nice4'},
    ];
    return mock;
  }
}
