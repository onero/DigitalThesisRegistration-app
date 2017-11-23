import { Component, OnInit } from '@angular/core';
import {Contract} from '../shared/contract.model';
import {ContractService} from '../shared/contract.service';
import {SharedData} from '../shared/sharedData';
import {Router} from "@angular/router";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  contracts: Contract[];

  ngOnInit() {
    this.contracts = this.contractService.getMockContract();
  }

  constructor(private contractService: ContractService, private router: Router) { }

  selectContract(contract: Contract) {
    // Converting the contract object into a hashed string value by using the base 64 encoding btoa. btoa is for encrypting.
    const hashedValueOfTheContractObject = btoa(JSON.stringify(contract));
    // This is where we change the url. We append the hashedValue to the end of the url.
    this.router.navigate(['contracts/editContract', hashedValueOfTheContractObject]);
  }

}
