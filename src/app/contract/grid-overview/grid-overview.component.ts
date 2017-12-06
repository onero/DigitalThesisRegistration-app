// import { Component, OnInit } from '@angular/core';
// import {ActivatedRoute} from '@angular/router';
// import {TableView} from 'NG2TableView';
// import {PageTableColumns} from './column-factory';
// import {Contract} from '../shared/contract.model';
//
// @Component({
//   selector: 'app-grid-overview',
//   templateUrl: './grid-overview.component.html',
//   styleUrls: ['./grid-overview.component.css']
// })
// export class GridOverviewComponent extends TableView implements OnInit {
//
//   contracts: Contract[];
//
//   constructor(private route: ActivatedRoute) {
//     super(route.snapshot.data['users']);
//   }
//
//   ngOnInit() {
//     this.getBuilder()
//       .addCols(PageTableColumns)
//       .setPaging(true)
//       .setItemsPerPage(5)
//       .setSelectable(true);
//     // .setFiltering(2)
//     // .setSorting(true);
//
//     this.buildTable();
//   }
//
//
//   // // TODO: Remove
//   // mockCompany: Admin[] = [
//   //   {id: 1, name: 'Mr. Nice0', contactName: 'Contactname0', contactEmail: 'email0', title: '123'},
//   //   {id: 2, name: 'Mr. Nice1', contactName: 'Contactname1', contactEmail: 'email1', title: '123'},
//   //   {id: 3, name: 'Mr. Nice2', contactName: 'Contactname2', contactEmail: 'email2', title: '123'},
//   //   {id: 4, name: 'Mr. Nice3', contactName: 'Contactname3', contactEmail: 'email3', title: '123'},
//   //   {id: 5, name: 'Mr. Nice4', contactName: 'Contactname4', contactEmail: 'email4', title: '123'},
//   // ];
//
// }
