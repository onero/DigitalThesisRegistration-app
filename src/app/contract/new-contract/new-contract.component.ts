import { Component, OnInit } from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Student} from '../shared/student.model';
import {Contract} from '../shared/contract.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css']
})
export class NewContractComponent implements OnInit {

  groupId: number;
  students: Student[];
  contactEmail: string;

  constructor(private contractService: ContractService, private route: ActivatedRoute) {
    route.params.subscribe(params => this.groupId = params['groupId']);
  }

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

  onNotify(email: string) {
    this.contactEmail = email;
  }

}
