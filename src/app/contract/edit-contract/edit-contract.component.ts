import { Component, OnInit } from '@angular/core';
import {SharedData} from '../shared/sharedData';
import {ActivatedRoute} from '@angular/router';
import {ContractService} from '../shared/contract.service';
import {Contract} from "../shared/contract.model";

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent implements OnInit {

  constructor(private contractSerivce: ContractService, private route: ActivatedRoute) {
    // Grabbing the url.
    route.params.subscribe(params => {
      // Getting the hashValue from the url. 'contractId' is defined in contract.routing.
      const contractId = params['contractId'];
      // Converting the hashValue to a Contract object. atob is base 64 encoding, that we are using for the hashValue. atop is for decrypting.
      const contract: Contract = JSON.parse(atob(contractId));
      // Logging the hashValue.
      console.log(params);
      // Calling the contract.service.getById() and logging the response. (The response is the contract from the database).
      console.log(contractSerivce.getById(contract.groupId, contract.projectId, contract.companyId));
    });
  }

  ngOnInit() {

  }

}
