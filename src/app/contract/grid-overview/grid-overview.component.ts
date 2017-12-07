import { Component, OnInit } from '@angular/core';
import {ContractService} from '../shared/contract.service';
import {Contract} from '../shared/contract.model';
import {GridData} from '../shared/gridData.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-grid-overview',
  templateUrl: './grid-overview.component.html',
  styleUrls: ['./grid-overview.component.css']
})
export class GridOverviewComponent implements OnInit {


  gridData: GridData[];
  data = [];

  public rows: Array<any> = [];
  //     {title: 'Project Title', name: 'projectTitle', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by title'}},
  public columns: Array<any> = [
    {title: 'Project Title', name: 'projectTitle', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by title'}},
    {title: 'Wanted Supervisor', name: 'wantedSupervisor', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Assigned Supervisor', name: 'assignedSupervisor', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Company', name: 'company', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'Status', name: 'status', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by status'}},
  ];
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };


  constructor(private contractService: ContractService,
              private router: Router) {
    this.length = this.data.length;
  }

  ngOnInit() {
    // Get all ContractGridBOs from backend, called gridData.model
    this.contractService.getGridData().subscribe(gridDatas => {
      this.gridData = gridDatas;
      // For each ContractBO
      gridDatas.forEach(gridData => {
        // Check if wantedSupervisor is set, if not set to empty string
        const wantedSupervisor = gridData.wantedSupervisor != null ?
          gridData.wantedSupervisor.firstName + ' ' + gridData.wantedSupervisor.lastName :
          '';
        // Check if wantedSupervisor is set, if not set to informational string
        const assignedSupervisor = gridData.assignedSupervisor != null ?
          gridData.assignedSupervisor.firstName + ' ' + gridData.assignedSupervisor.lastName :
          'Needs assigned supervisor!';
        const supervisorApproved = gridData.contract.supervisorApproved;
        const adminApproved = gridData.contract.adminApproved;
        let status = 'Not approved';
        if (supervisorApproved && adminApproved) {
          status = 'Fully approved';
        } else if (supervisorApproved) {
          status = 'Approved by supervisor';
        }
        // Add new entry for gridview
        this.data.push({
          projectTitle: gridData.project.title,
          wantedSupervisor: wantedSupervisor,
          assignedSupervisor: assignedSupervisor,
          company: gridData.company.name,
          status: status
        });
        this.onChangeTable(this.config);
      });
    });
  }



  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    const index = this.rows.indexOf(data.row);
    const tempContract = this.gridData[index].contract;
    const contract: Contract = {
      project: tempContract.project,
      supervisorApproved: tempContract.supervisorApproved,
      adminApproved: tempContract.adminApproved,
      projectId: tempContract.projectId,
      groupId: tempContract.groupId,
      companyId: tempContract.companyId
    };
    // Converting the contract object into a hashed string value by using the base 64 encoding btoa. btoa is for encrypting.
    const hashedValueOfTheContractObject = btoa(JSON.stringify(contract));
    // This is where we change the url. We append the hashedValue to the end of the url.
    this.router.navigate(['contracts/editContract', hashedValueOfTheContractObject]);
  }
}
