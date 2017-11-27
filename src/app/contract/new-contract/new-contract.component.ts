import { Component, OnInit } from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Student} from '../shared/student.model';
import {Contract} from '../shared/contract.model';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css']
})
export class NewContractComponent implements OnInit {

  students: Student[];

  constructor(private contractService: ContractService) { }

  ngOnInit() {
    this.students = [];
  }
  createContract() {
    const contract: Contract = {title: 'The title', studentIds: []};
    for (const student of this.students) {
      contract.studentIds.push(student.id);
    }
    this.contractService.addContract(contract);
  }

}
