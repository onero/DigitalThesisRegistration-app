import { Component, OnInit } from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Student} from '../shared/student.model';
import {Contract} from '../shared/contract.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../shared/group.service';
import {Company} from '../shared/company.model';
import {CompanyService} from '../shared/company.service';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css']
})
export class NewContractComponent implements OnInit {

  groupId: number;
  companyId: number;
  students: Student[];
  contactEmail = '';
  company: Company; // TODO RKL: Remove if possible.

  constructor(private contractService: ContractService, private groupService: GroupService,
              private companyService: CompanyService, private route: ActivatedRoute, private router: Router) {
    this.company = {name: '', contactName: '', contactPhone: '', contactEmail: ''};
  }

  ngOnInit() {
    this.students = [];
  }
  createContract() {
    const contract: Contract = {title: 'The title', studentIds: [], groupId: this.groupId, companyId: this.companyId};
    for (const student of this.students) {
      contract.studentIds.push(student.id);
    }

    // Adding the contract to the mock. TODO: Make it real data.
    this.contractService.addContract(contract);
    // This is for checking that the contract have all the ids when creating it. TODO: Remove when contract is done done.
    console.log('Company id: ' + contract.companyId + ' ProjectId: ' + contract.projectId + ' GroupId: ' + contract.groupId);
    this.router.navigateByUrl('contracts');
  }

  onNotify(email: string) {
    this.contactEmail = email;
  }

  updateGroupId(groupId: number) {
    this.groupId = groupId;
  }

  updateCompanyId(companyId: number) {
    this.companyId = companyId;
  }
}
