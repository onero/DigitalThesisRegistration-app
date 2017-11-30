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
    this.project.wantedSuporvisorId = id;
    this.isProjectInfoAdded = true;
  }
  onAssignedSuporvisorChange(id: number) {
    this.project.assignedSuporvisorId = id;
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
      isApproved: false};

    if (this.isProjectInfoAdded) {
      this.projectService.create(this.project).subscribe(p => {
        contract.projectId = p.id;
        this.contractService.createContract(contract).subscribe(() =>
          {
            this.router.navigateByUrl('contracts');
          });
      });
    } else {
      this.contractService.createContract(contract).subscribe(() =>
      {
        this.router.navigateByUrl('contracts');
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
    if (this.companyId > 0 && this.groupId > 0) {
      return true;
    }
    return false;
  }
}
