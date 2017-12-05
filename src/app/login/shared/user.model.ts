import {Group} from '../../contract/shared/group.model';

export class User {
  username: string;
  password: string;
  token?: string;
  role?: string;
  group?: Group;
}
