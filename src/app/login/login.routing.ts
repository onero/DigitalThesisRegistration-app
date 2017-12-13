import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NewGroupComponent} from './new-group/new-group.component';

export const loginRoutes = RouterModule.forRoot(
  [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'newGroup',
      component: NewGroupComponent
    }
  ]);
