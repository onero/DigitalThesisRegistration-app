import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {appRoutes} from './app.routing';
import {RouterModule} from '@angular/router';
import {StudentModule} from './student/student.module';
import {studentRoutes} from './student/student.routing';
import {ContractModule} from './contract/contract.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginModule} from "./login/login.module";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
