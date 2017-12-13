import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {loginRoutes} from './login.routing';
import {LoginService} from './shared/login.service';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ValidateDirective} from './new-group/validate.directive';
import {NewGroupComponent} from './new-group/new-group.component';


@NgModule({
  imports: [
    CommonModule,
    loginRoutes,
    FormsModule,
    HttpModule
  ],
  declarations: [
    LoginComponent,
    NewGroupComponent,
    ValidateDirective,
  ],
  providers: [LoginService]
})
export class LoginModule { }
