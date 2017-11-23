import { Component, OnInit } from '@angular/core';
import {Contract} from '../shared/contract.model';
import {ContractService} from '../shared/contract.service';
import {SharedData} from '../shared/sharedData';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  contracts: Contract[];

  constructor(private contractService: ContractService, private sharedData: SharedData) { }

  ngOnInit() {
    this.contracts = this.contractService.getMockContract();
  }

  selectContract(contract: Contract) {
    this.sharedData.contract = contract;
  }

}
