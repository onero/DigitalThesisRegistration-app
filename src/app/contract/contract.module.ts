import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts/contracts.component';
import {contractRoutes} from './contract.routing';

@NgModule({
  imports: [
    CommonModule,
    contractRoutes
  ],
  declarations: [ContractsComponent]
})
export class ContractModule { }
