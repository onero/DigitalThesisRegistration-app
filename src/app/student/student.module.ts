import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students/students.component';
import { studentRoutes} from './student.routing';

@NgModule({
  imports: [
    CommonModule,
    studentRoutes
  ],
  declarations: [StudentsComponent]
})
export class StudentModule { }
