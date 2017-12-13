import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {loginRoutes} from './login.routing';
import {LoginService} from './shared/login.service';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    loginRoutes,
    FormsModule,
    HttpModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [LoginService]
})
export class LoginModule { }
