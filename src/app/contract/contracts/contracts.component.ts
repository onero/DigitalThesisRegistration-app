import { Component, OnInit } from '@angular/core';
import {Contract} from '../shared/contract.model';
import {ContractService} from '../shared/contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  contracts: Contract[];

  constructor(private contractService: ContractService) { }

  ngOnInit() {
    this.contracts = this.contractService.getMockContract();
  }

}
