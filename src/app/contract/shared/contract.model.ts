import {Project} from './project.model';
import {Student} from './student.model';

export class Contract {
  groupId?: number;
  companyId?: number;
  projectId?: number;
  AdminApproved: boolean;
  SupervisorApproved: boolean;
  project?: Project;
  students?: Student[];
}
