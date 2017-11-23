import { Component, OnInit } from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Student} from '../shared/student.model';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css']
})
export class NewContractComponent implements OnInit {

  students: Student[];

  constructor(private contractService: ContractService) { }

  ngOnInit() {
    this.students = this.contractService.getMockStudents();
  }

}
