import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractService} from '../shared/contract.service';
import {Contract} from '../shared/contract.model';
import {Student} from "../shared/student.model";
import {forEach} from "@angular/router/src/utils/collection";
import {StudentService} from "../shared/student.service";

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent implements OnInit {

  contract: Contract;
  students: Student[] = [];

  constructor(private contractSerivce: ContractService, private route: ActivatedRoute, private studentService: StudentService) {
    // Grabbing the url.
    route.params.subscribe(params => {
      // Getting the hashValue from the url. 'contractId' is defined in contract.routing.
      const contractId = params['contractId'];
      // Converting the hashValue to a Contract object. atob is base 64 encoding, that we are using for the hashValue. atop is for decrypting.
      const contract: Contract = JSON.parse(atob(contractId));
      // Logging the hashValue.
      console.log(params);
      // Calling the contract.service.getById() and logging the response. (The response is the contract from the database).
      this.contract = contractSerivce.getById(contract.groupId, contract.projectId, contract.companyId);
      this.populateStudents();
    });
  }

  populateStudents() {
    if (this.contract.studentIds != null) {
      for (const studentId of this.contract.studentIds) {
        this.studentService.get(studentId).subscribe(s => this.students.push(s));
      }
    }
  }

  ngOnInit() {

  }

}
