import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractService} from '../shared/contract.service';
import {Contract} from '../shared/contract.model';
import {Student} from '../shared/student.model';
import {forEach} from '@angular/router/src/utils/collection';
import {StudentService} from '../shared/student.service';
import {Group} from '../shared/group.model';
import {GroupService} from '../shared/group.service';
import {CompanyService} from '../shared/company.service';
import {Company} from '../shared/company.model';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project.model';
import {Supervisor} from '../shared/supervisor.model';
import {SupervisorService} from '../shared/supervisor.service';
import {ContractsComponent} from '../contracts/contracts.component';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent implements OnInit {

  isEditable: boolean;
  isGroup: boolean;
  isAdmin: boolean;

  contract: Contract;
  group: Group;
  company: Company;
  project: Project;
  assignedSupervisor: Supervisor;
  wantedSupervisor: Supervisor;
  executiveUser = false;

  // Variables for when editing. Storing in separete variables for easy discarding.
  editProject: Project;

  groupContactEmail = 'this is temporary'; // TODO RKL: Remove.

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private companyService: CompanyService,
              private projectService: ProjectService,
              private supervisorService: SupervisorService,
              private contractService: ContractService) {
    this.initializeEditVariables();
    this.setRole();
    this.isEditable = false;
    // Defining the properties of the group to avoid undefined property exception.
    this.group = {contactEmail: '', students: []};
    this.company = {name: '', contactName: '', contactPhone: '', contactEmail: ''};
    // Instantiating the project so we don't get undefined properties. Might be this is doable for company too?
    this.project = {};
    this.assignedSupervisor = {firstName: '', lastName: ''};
    this.wantedSupervisor = {firstName: '', lastName: ''};
    // Grabbing the url.
    route.params.subscribe(params => {
      // Getting the hashValue from the url. 'contractId' is defined in contract.routing.
      const contractId = params['contractId'];
      // Converting the hashValue to a Contract object.
      // atob is base 64 encoding, that we are using for the hashValue. atop is for decrypting.
      const contract: Contract = JSON.parse(atob(contractId));
      // Logging the hashValue.
      console.log(params);
      // Calling the contract.service.getById() and logging the response. (The response is the contract from the database).
      // this.contract = contractSerivce.getById(contract.groupId, contract.projectId, contract.companyId);
      this.contract = contract;
      this.populateGroup();
      this.populateCompany();
      this.populateProject();
      // this.project = contract.project;
      console.log('ProjectId: ' + this.project.id);
      // this.populateSupervisors();
    });
  }

  ngOnInit() {
    const role = localStorage.getItem('Role');
    this.executiveUser = role === 'Administrator' || role === 'Supervisor';
  }

  initializeEditVariables() {
    this.editProject = {};
  }

  private populateGroup() {
    if (this.contract.groupId != null) {
      this.groupService.get(this.contract.groupId).subscribe(g => this.group = g);
    }
  }


  private populateCompany() {
    if (this.contract.companyId != null) {
      this.companyService.get(this.contract.companyId).subscribe(c => this.company = c);
    }else {
      console.log('No company id');
    }
  }

  private populateProject() {
    if (this.contract.projectId != null) {
      this.projectService.get(this.contract.projectId).subscribe(p => {
        this.project = p;
        this.supervisorService.get(this.project.assignedSupervisorId).subscribe(s => {
          this.assignedSupervisor = s;
          console.log(this.assignedSupervisor);
        });
        this.supervisorService.get(this.project.wantedSupervisorId).subscribe(s => {
          this.wantedSupervisor = s;
        });
        console.log('Project Id: ' + this.project.id + ' Project Title: ' + this.project.title);
      });

    }else {
      // TODO: Remove when implementation is done.
      console.log('No project id');
    }
  }

  populateSupervisors() {
    if (this.contract.projectId != null) {
      this.supervisorService.get(this.project.assignedSupervisorId).subscribe(s => {
        this.assignedSupervisor = s;
      });
      this.supervisorService.get(this.project.wantedSupervisorId).subscribe(s => {
        this.wantedSupervisor = s;
      });
    }
  }

  isGroupLoggedIn(): boolean {
    const role = localStorage.getItem('Role');
    if (role === 'Group') {
      return true;
    }
    return false;
  }

  setRole() {
    const role = localStorage.getItem('Role');
    switch (role) {
      case 'Group' : {
        this.isGroup = true;
        this.isAdmin = false;
        break;
      }
      case 'Administrator' : {
        this.isGroup = false;
        this.isAdmin = true;
        break;
      }
    }
  }

  updateAssignedSupervisorOnProject(supervisorId: number) {
    this.project.assignedSupervisorId = supervisorId;
    this.projectService.update(this.project).subscribe(p => {
      this.project = p;
      console.log('Updated supervisor from admin');
    });
  }

  UpdateApproveStatus() {
    const role = localStorage.getItem('Role');
    if (role === 'Supervisor') {
      this.contract.supervisorApproved = !this.contract.supervisorApproved;
      console.log('Contract supervisorApproved before ' + this.contract.supervisorApproved);
      this.contractService.update(this.contract).subscribe(c => {
        console.log('Contract supervisorApproved after: ' + c.supervisorApproved);
        this.contract.supervisorApproved = c.supervisorApproved;
      });
    } else {
      if (this.contract.supervisorApproved) {
        this.contract.adminApproved = !this.contract.adminApproved;
        console.log('Contract adminApproved before ' + this.contract.adminApproved);
        this.contractService.update(this.contract).subscribe(c => {
          console.log('Contract adminApproved after: ' + c.adminApproved);
          this.contract.adminApproved = c.adminApproved;
        });
      }
    }
  }

  ExecutiveApproved() {
    const role = localStorage.getItem('Role');
    if (role === 'Supervisor') {
      return this.contract.supervisorApproved;
    } else {
      return this.contract.adminApproved;
    }
  }

  setIsEditable() {
    this.isEditable = !this.isEditable;
  }

  setEditVariables() {
    this.editProject = this.project;
  }

  saveChangesFromEdit() {
    this.project = this.editProject;

    console.log('Title: ' + this.project.title + '\nDescription: ' + this.project.description
      + '\nStart: ' + this.project.start + '\nEnd: ' + this.project.end + '\nWantedId: ' +
      this.project.wantedSupervisorId);
    // this.projectService.update(this.project);
  }

  onEditProjectTitleChange(title: string) {
    this.editProject.title = title;
  }

  onEditProjectDescriptionChange(description: string) {
    this.editProject.description = description;
  }

  onEditProjectStartChange(start: NgbDateStruct) {
    this.editProject.start = new Date(start.year, start.month, start.day);
  }

  onEditProjectEndChange(end: NgbDateStruct) {
    this.editProject.end = new Date(end.year, end.month, end.day)
  }

  onEditProjectWantedSupervisor(id: number) {
    this.editProject.wantedSupervisorId = id;
  }
}
