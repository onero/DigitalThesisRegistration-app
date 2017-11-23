import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts/contracts.component';
import {contractRoutes} from './contract.routing';
import {ContractService} from './shared/contract.service';
import { NewContractComponent } from './new-contract/new-contract.component';
import { StudentsListComponent } from './students-list/students-list.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    contractRoutes,
    FormsModule
  ],
  declarations: [ContractsComponent, NewContractComponent, StudentsListComponent],
  providers: [ContractService, NgbModal, NgbModalStack]
})
export class ContractModule { }
