import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/guards/guard.service';

export const appRoutes = RouterModule.forRoot(
  [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ]
);
