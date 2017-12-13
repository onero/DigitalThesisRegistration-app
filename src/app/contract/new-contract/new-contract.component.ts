import {Component, Input, OnInit, Output} from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Student} from '../shared/student.model';
import {Contract} from '../shared/contract.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../shared/group.service';
import {Company} from '../shared/company.model';
import {CompanyService} from "../shared/company.service";
import {Project} from '../shared/project.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ProjectService} from '../shared/project.service';

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
  @Input()
  project: Project;
  isProjectInfoAdded = false;
  company: Company; // TODO RKL: Remove if possible.

  constructor(private contractService: ContractService,
              private groupService: GroupService,
              private companyService: CompanyService,
              private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService) {
    this.company = {name: '', contactName: '', contactPhone: '', contactEmail: ''};
    this.contactEmail = localStorage.getItem('GroupMail');
    this.groupId = +localStorage.getItem('GroupId');
    console.log(this.contactEmail);
  }

  ngOnInit() {
    this.students = [];
    this.project = {
    };
  }

  onProjectTitleChange(title: string) {
    this.project.title = title;
    this.isProjectInfoAdded = true;
  }

  onProjectDescriptionChange(description: string) {
    this.project.description = description;
    this.isProjectInfoAdded = true;
  }

  onWantedSuporvisorChange(id: number) {
    this.project.wantedSupervisorId = id;
    this.isProjectInfoAdded = true;
  }
  onAssignedSuporvisorChange(id: number) {
    this.project.assignedSupervisorId = id;
    this.isProjectInfoAdded = true;
  }

  onStartPeriodChange(start: NgbDateStruct) {
    this.project.start = new Date(start.year, start.month, start.day);
    this.isProjectInfoAdded = true;
  }
  onEndPeriodChange(start: NgbDateStruct) {
    this.project.end = new Date(start.year, start.month, start.day);
    this.isProjectInfoAdded = true;
  }

  createContract() {
    const contract: Contract = {
      groupId: this.groupId,
      companyId: this.companyId,
      projectId: 0,
      adminApproved: false,
      supervisorApproved: false};

    if (this.isProjectInfoAdded) {
      this.projectService.create(this.project).subscribe(p => {
        contract.projectId = p.id;
        this.contractService.createContract(contract).subscribe( c => {
          const hashedValueOfTheContractObject = btoa(JSON.stringify(c));
          // This is where we change the url. We append the hashedValue to the end of the url.
          this.router.navigate(['contracts/editContract', hashedValueOfTheContractObject]);
          });
      });
    } else {
      this.contractService.createContract(contract).subscribe(() => {
        this.contractService.createContract(contract).subscribe( c => {
          const hashedValueOfTheContractObject = btoa(JSON.stringify(c));
          // This is where we change the url. We append the hashedValue to the end of the url.
          this.router.navigate(['contracts/editContract', hashedValueOfTheContractObject]);
        });
      });
    }
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

  ableToCreateContract(): boolean {
    if (this.companyId > 0 /*&& this.groupId > 0*/) {
      return true;
    }
    return false;
  }

  isGroupLoggedIn(): boolean {
    const role = localStorage.getItem('Role');
    if (role === 'Group') {
      return true;
    }
    return false;
  }
}
