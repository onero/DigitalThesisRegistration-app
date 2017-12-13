import {Directive, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts/contracts.component';
import {contractRoutes} from './contract.routing';
import {ContractService} from './shared/contract.service';
import { NewContractComponent } from './new-contract/new-contract.component';
import { StudentsListComponent } from './students-list/students-list.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentService} from './shared/student.service';
import {HttpClientModule} from '@angular/common/http';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { GroupContactComponent } from './group-contact/group-contact.component';
import {GroupService} from './shared/group.service';
import { CompanyComponent } from './company/company.component';
import {CompanyService} from './shared/company.service';
import { ProjectNameComponent } from './project/project-name/project-name.component';
import { ProjectPeriodComponent } from './project/project-period/project-period.component';
import { ProjectDescriptionComponent } from './project/project-description/project-description.component';
import {ProjectService} from './shared/project.service';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { ProjectSupervisorComponent } from './project/project-supervisor/project-supervisor.component';
import {SupervisorService} from './shared/supervisor.service';
import { GridOverviewComponent } from './grid-overview/grid-overview.component';
import {Ng2TableModule} from 'ng2-table';
import { AppendixComponent } from './appendix/appendix.component';
import {AppendixService} from '../shared/appendix.service';
import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import { NewGroupComponent } from './new-group/new-group.component';
import {ValidateDirective} from './new-group/validate.directive';
import {HttpModule} from '@angular/http';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule,
    contractRoutes,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    Ng2TableModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rotatingPlane,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    HttpModule
  ],
  declarations: [ContractsComponent,
    NewContractComponent,
    StudentsListComponent,
    EditContractComponent,
    GroupContactComponent,
    CompanyComponent,
    ProjectNameComponent,
    ProjectPeriodComponent,
    ProjectDescriptionComponent,
    ProjectSupervisorComponent,
    GridOverviewComponent,
    AppendixComponent,
    NewGroupComponent,
    ValidateDirective,
  ],
  providers: [ContractService,
    StudentService,
    NgbModal,
    NgbModalStack,
    GroupService,
    CompanyService,
    SupervisorService,
    ProjectService,
    AppendixService]
})
export class ContractModule { }
