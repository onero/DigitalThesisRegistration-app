import { Component, OnInit } from '@angular/core';
import {Contract} from '../shared/contract.model';
import {ContractService} from '../shared/contract.service';
import {Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  contracts: Contract[];


  constructor(private contractService: ContractService,
              private router: Router,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.contractService.getAll().subscribe(contracts => {
      contracts.forEach(c => {
        // console.log(c.projectId);
        this.projectService.get(c.projectId).subscribe(p => c.project = p);
        this.contracts = contracts;
      });
    });
  }

  selectContract(contract: Contract) {
    // Converting the contract object into a hashed string value by using the base 64 encoding btoa. btoa is for encrypting.
    const hashedValueOfTheContractObject = btoa(JSON.stringify(contract));
    // This is where we change the url. We append the hashedValue to the end of the url.
    this.router.navigate(['contracts/editContract', hashedValueOfTheContractObject]);
  }

  newContractBtn() {
    this.router.navigateByUrl('contracts/newContract');
  }

}
