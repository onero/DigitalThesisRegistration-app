import {Component, Input, OnInit, Output} from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Student} from '../shared/student.model';
import {Contract} from '../shared/contract.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../shared/group.service';
import {Company} from "../shared/company.model";
import {CompanyService} from "../shared/company.service";
import {Project} from '../shared/project.model';
import {ProjectNameComponent} from '../project/project-name/project-name.component';

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
  @Input()
  project: Project;

  constructor(private contractService: ContractService,
              private groupService: GroupService,
              private companyService: CompanyService,
              private route: ActivatedRoute,
              private router: Router) {
    this.company = {name: '', contactName: '', contactPhone: '', contactEmail: ''};
  }

  ngOnInit() {
    this.students = [];
    this.project = {
    };
  }

  onProjectTitleChange(title: string) {
    this.project.title = title;
  }

  createContract() {
    const contract: Contract = {title: 'The title', studentIds: [], groupId: this.groupId};
    for (const student of this.students) {
      contract.studentIds.push(student.id);
    }

    this.companyService.create(this.company).subscribe(c => {
      this.company = c;
      contract.companyId = this.company.id;
      // Adding the contract to the mock. TODO: Make it real data.
      this.contractService.addContract(contract);

      this.router.navigateByUrl('contracts');
    });
  }

  onNotify(email: string) {
    this.contactEmail = email;
  }

  updateGroupId(groupId: number) {
    this.groupId = groupId;
  }
}
