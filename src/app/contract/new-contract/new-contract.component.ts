import { Component, OnInit } from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Student} from '../shared/student.model';
import {Contract} from '../shared/contract.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../shared/group.service';
import {Company} from "../shared/company.model";

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css']
})
export class NewContractComponent implements OnInit {

  groupId: number;
  students: Student[];
  contactEmail = '';
  company: Company;

  constructor(private contractService: ContractService, private groupService: GroupService,
              private route: ActivatedRoute, private router: Router) {
    this.company = {name: '', contactName: '', contactPhone: '', contactEmail: ''};
  }

  ngOnInit() {
    this.students = [];
  }
  createContract() {
    const contract: Contract = {title: 'The title', studentIds: [], groupId: this.groupId};
    for (const student of this.students) {
      contract.studentIds.push(student.id);
    }

    console.log('GroupId for contract: ' + this.groupId);
    // Updating the group with the contactEmail.
    // const group = {id: this.groupId, contactEmail: this.contactEmail, students: []};
    // this.groupService.update(group).subscribe();


    // Adding the contract to the mock. TODO: Make it real data.
    this.contractService.addContract(contract);

    this.router.navigateByUrl('contracts');
  }

  onNotify(email: string) {
    this.contactEmail = email;
  }

  updateGroupId(groupId: number) {
    this.groupId = groupId;
  }
}
