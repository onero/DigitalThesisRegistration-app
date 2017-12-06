import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TableView} from 'NG2TableView';
import {PageTableColumns} from './column-factory';
import {ContractService} from '../shared/contract.service';
import {Contract} from '../shared/contract.model';

@Component({
  selector: 'app-grid-overview',
  templateUrl: './grid-overview.component.html',
  styleUrls: ['./grid-overview.component.css']
})
export class GridOverviewComponent extends TableView implements OnInit {

  contracts: Contract[];
  gridData = [];


  constructor(private route: ActivatedRoute,
              private contractService: ContractService) {
    super(route.snapshot.data['users']);
  }

  ngOnInit() {
    // Get all ContractGridBOs from backend, called gridData.model
    this.contractService.getGridData().subscribe(gridDatas => {
      // For each ContractBO
      gridDatas.forEach(gridData => {
        // Check if wantedSupervisor is set, if not set to empty string
        let wantedSupervisor = gridData.wantedSupervisor != null ?
          gridData.wantedSupervisor.firstName + ' ' + gridData.wantedSupervisor.lastName :
          '';
        // Check if wantedSupervisor is set, if not set to informational string
        let assignedSupervisor = gridData.assignedSupervisor != null ?
          gridData.assignedSupervisor.firstName + ' ' + gridData.assignedSupervisor.lastName :
          'Needs assigned supervisor!';
        // Add new entry for gridview
        this.gridData.push({
          projectTitle: gridData.project.title,
          wantedSupervisor: wantedSupervisor,
          assignedSupervisor: assignedSupervisor,
          company: gridData.company.name
        });
      });
      // Build gridview
      this.getBuilder()
        .addCols(PageTableColumns)
        .setPaging(true)
        .setItemsPerPage(5)
        .setSelectable(false)
        .data = this.gridData;
      this.buildTable();
    });
  }

}
