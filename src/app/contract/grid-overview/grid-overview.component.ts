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
              private contractService: ContractService,
              private projectService: ProjectService) {
    super(route.snapshot.data['users']);
  }

  ngOnInit() {
    this.contractService.getContractByGroupId(5).subscribe(c => {
      this.projectService.get(c.projectId).subscribe(p => {
        this.gridData.push({projectTitle: p.title});
        this.getBuilder()
          .addCols(PageTableColumns)
          .setPaging(true)
          .setItemsPerPage(5)
          .setSelectable(true)
          .data = this.gridData;
        this.buildTable();
      });
    });
  }

}
