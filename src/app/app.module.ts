import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {appRoutes} from './app.routing';
import {RouterModule} from '@angular/router';
import {ContractModule} from './contract/contract.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginModule} from "./login/login.module";
import {AuthGuard} from "./shared/guards/guard.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./shared/token.interceptor";
import {AuthService} from "./shared/auth.service";
import {JwtInterceptor} from "./shared/jwt.interceptor";
import {AdminGuard} from "./shared/guards/admin.guard";
import {GroupGuard} from "./shared/guards/group.guard";
import {ExecutiveGuard} from './shared/guards/supervisor.guard';
import {EqualValidator} from "./contract/new-group/password.match.directive";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    appRoutes,
    ContractModule,
    FormsModule,
    NgbModule.forRoot(),
    LoginModule
  ],
  providers: [AuthGuard, AdminGuard, GroupGuard, AuthService, ExecutiveGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
