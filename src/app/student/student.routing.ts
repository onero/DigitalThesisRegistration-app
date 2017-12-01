import {RouterModule} from '@angular/router';
import {StudentsComponent} from './students/students.component';

export const studentRoutes = RouterModule.forRoot(
  [
    {
      path: 'students',
      component: StudentsComponent
    }
  ]);
