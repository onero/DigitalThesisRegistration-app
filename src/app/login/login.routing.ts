import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';

export const loginRoutes = RouterModule.forRoot(
  [
    {
      path: 'login',
      component: LoginComponent
    }
  ]);
