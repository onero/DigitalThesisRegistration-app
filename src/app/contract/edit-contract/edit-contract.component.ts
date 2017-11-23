import { Component, OnInit } from '@angular/core';
import {SharedData} from '../shared/sharedData';

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent implements OnInit {

  constructor(private sharedData: SharedData) { }

  ngOnInit() {
    console.log(this.sharedData.contract);
  }

}
