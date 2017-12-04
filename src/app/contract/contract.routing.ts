import {ContractsComponent} from './contracts/contracts.component';
import {RouterModule} from '@angular/router';
import {NewContractComponent} from './new-contract/new-contract.component';
import {EditContractComponent} from './edit-contract/edit-contract.component';
import {AuthGuard} from '../shared/guard.service';

export const contractRoutes = RouterModule.forRoot(
  [
    {
      path: 'contracts',
      component: ContractsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'contracts/newContract',
      component: NewContractComponent
    },
    {
      // '/:contractId' is holding our hashed value. We decide the name here.
      path: 'contracts/editContract/:contractId',
      component: EditContractComponent
    }
  ]);
