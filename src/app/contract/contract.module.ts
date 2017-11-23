import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts/contracts.component';
import {contractRoutes} from './contract.routing';
import {ContractService} from './shared/contract.service';
import { NewContractComponent } from './new-contract/new-contract.component';
import { StudentsListComponent } from './students-list/students-list.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentService} from './shared/student.service';
import {HttpClientModule} from '@angular/common/http';
import { EditContractComponent } from './edit-contract/edit-contract.component';

@NgModule({
  imports: [
    CommonModule,
    contractRoutes,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ContractsComponent, NewContractComponent, StudentsListComponent, EditContractComponent],
  providers: [ContractService, StudentService, NgbModal, NgbModalStack]
})
export class ContractModule { }
