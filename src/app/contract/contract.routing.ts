import {ContractsComponent} from './contracts/contracts.component';
import {RouterModule} from '@angular/router';

export const contractRoutes = RouterModule.forRoot(
  [
    {
      path: 'contracts',
      component: ContractsComponent
    }
  ]);
