import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {loginRoutes} from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    loginRoutes
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
