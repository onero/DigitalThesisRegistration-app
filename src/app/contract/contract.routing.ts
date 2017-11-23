import {ContractsComponent} from './contracts/contracts.component';
import {RouterModule} from '@angular/router';
import {NewContractComponent} from './new-contract/new-contract.component';
import {EditContractComponent} from './edit-contract/edit-contract.component';

export const contractRoutes = RouterModule.forRoot(
  [
    {
      path: 'contracts',
      component: ContractsComponent
    },
    {
      path: 'contracts/newContract',
      component: NewContractComponent
    },
    {
      path: 'contracts/editContract',
      component: EditContractComponent
    }
  ]);
