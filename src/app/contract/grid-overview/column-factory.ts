import {ColumnIfc, TableColumns, TableColumn} from 'NG2TableView';

export const PageTableColumns: Array<ColumnIfc> = new TableColumns()
  .addCol(new TableColumn()
    .setTitle('Project Title')
    .setName('projectTitle')
  )
  .addCol(new TableColumn()
    .setTitle('Wanted Supervisor')
    .setName('wantedSupervisor')
    .setSort(true)
  )
  .addCol(new TableColumn()
    .setTitle('Assigned Supervisor')
    .setName('assignedSupervisor')
    .setSort(true)
  )
  .addCol(new TableColumn()
    .setTitle('Company')
    .setName('company')
    .setSort(true)
  )
  .addCol(new TableColumn()
    .setTitle('Status')
    .setName('status')
    .setSort(true)
  )
  .getCols();
