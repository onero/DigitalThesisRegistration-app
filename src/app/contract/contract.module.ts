import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts/contracts.component';
import {contractRoutes} from './contract.routing';
import {ContractService} from './shared/contract.service';

@NgModule({
  imports: [
    CommonModule,
    contractRoutes
  ],
  declarations: [ContractsComponent],
  providers: [ContractService]
})
export class ContractModule { }
