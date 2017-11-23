import {Observable} from 'rxjs/Observable';
import {Contract} from './contract.model';
import {Student} from './student.model';

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

  getMockStudents() {
    const mockStudents: Student[] = [
      {firstName: 'Rasmus', lastName: 'Lindved'},
      {firstName: 'Mathias', lastName: 'Skovgaard'}
    ];
    return mockStudents;
  }
}
