import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {LoginService} from '../shared/login.service';
import {Router} from '@angular/router';
import {ContractService} from '../../contract/shared/contract.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private contractService: ContractService) { }

  ngOnInit() {
  }

  loginOnEnter($event, userName: string, password: string) {
    if ($event.code === 'Enter') {
      this.login(userName, password);
    }
  }

  login(userName: string, password: string) {
    const user: User = {username: userName, password: password, group: {id: 0, contactEmail: '', students: []}};
    this.loginService.validateUser(user).subscribe(u => {
      user.token = u.token;
      user.role = u.role;
      if (u.role === 'Group') {
        user.group.id = u.group.id;
      }
      localStorage.setItem('Token', u.token);
      localStorage.setItem('LoggedIn', 'true');
      localStorage.setItem('Role', u.role);

      switch (user.role) {
        case 'Administrator':
          console.log('Admin login');
          this.router.navigateByUrl('contracts');
          break;
        case 'Supervisor':
          console.log('Supervisor login');
          this.router.navigateByUrl('contracts');
          break;
        case 'Group':
          console.log('Group login. Id: ' + user.group.id);
          localStorage.setItem('GroupMail', user.username);
          localStorage.setItem('GroupId', user.group.id + '');
          this.contractService.getContractByGroupId(user.group.id).subscribe(c => {
            if (c.projectId !== 0 && c.companyId !== 0) {
              console.log('GroupId from login: ' + user.group.id);
              console.log('ProjectId from login right before hashing: ' + c.projectId);
              const hashedValueOfTheContractObject = btoa(JSON.stringify(c));
              this.router.navigate(['contracts/editContract', hashedValueOfTheContractObject]);
            }
          });
          break;
        default:
          console.log('Cant find the login');
      }
    });
  }

}
