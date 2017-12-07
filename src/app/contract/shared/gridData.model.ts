import {Project} from './project.model';
import {Contract} from './contract.model';
import {Company} from './company.model';
import {Supervisor} from './supervisor.model';

export class GridData {
  contract?: Contract;
  company?: Company;
  project?: Project;
  wantedSupervisor?: Supervisor;
  assignedSupervisor?: Supervisor;
}
