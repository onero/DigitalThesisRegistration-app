import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TableView} from 'NG2TableView';
import {PageTableColumns} from './column-factory';
import {DataService} from '../shared/data.service';
import {ContractService} from '../shared/contract.service';
import {ProjectService} from '../shared/project.service';
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
    this.contractService.getGridData().subscribe(gd => {
      gd.forEach(g => {
        let wantedSupervisor = g.wantedSupervisor != null ?
          g.wantedSupervisor.firstName + ' ' + g.wantedSupervisor.lastName :
          '';
        let assignedSupervisor = g.assignedSupervisor != null ?
          g.assignedSupervisor.firstName + ' ' + g.assignedSupervisor.lastName :
          'Needs assigned supervisor!';
        this.gridData.push({
          projectTitle: g.project.title,
          wantedSupervisor: wantedSupervisor,
          assignedSupervisor: assignedSupervisor,
          company: g.company.name
        });
      });
      this.getBuilder()
        .addCols(PageTableColumns)
        .setPaging(true)
        .setItemsPerPage(5)
        .setSelectable(true)
        .data = this.gridData;
      this.buildTable();
    });
  }

}
