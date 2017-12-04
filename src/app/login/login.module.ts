import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {loginRoutes} from './login.routing';
import {LoginService} from './shared/login.service';

@NgModule({
  imports: [
    CommonModule,
    loginRoutes
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
