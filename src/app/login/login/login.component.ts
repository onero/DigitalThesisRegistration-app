import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {LoginService} from '../shared/login.service';
import {Router} from '@angular/router';
import {ContractService} from '../../contract/shared/contract.service';
import {LoginModel} from '../shared/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new LoginModel('', '');
  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor(private loginService: LoginService, private router: Router, private contractService: ContractService) { }

  ngOnInit() {
  }

  login(userName: string, password: string) {
    const user: User = {username: userName, password: password, group: {id: 0, contactEmail: '', students: []}};
    this.loginService.validateUser(user).subscribe(u => {
      user.token = u.token;
      user.role = u.role;
      if (u.role === 'Group') {
        user.group.id = u.group.id;
      }
      this.setUserInLocalStorage(u);

      switch (user.role) {
        case 'Administrator':
          this.goToContracts();
          break;
        case 'Supervisor':
          this.goToContracts();
          break;
        case 'Group':
          this.groupLogin(user);
          break;
      }
    });
  }

  setUserInLocalStorage(u) {
    localStorage.setItem('Token', u.token);
    localStorage.setItem('LoggedIn', 'true');
    localStorage.setItem('Role', u.role);
  }

  goToContracts() {
    this.router.navigateByUrl('contracts');
  }

  groupLogin(user: User) {
    localStorage.setItem('GroupMail', user.username);
    localStorage.setItem('GroupId', user.group.id + '');
    this.contractService.getContractByGroupId(user.group.id).subscribe(c => {
      if (c.projectId !== 0 && c.companyId !== 0) {
        const hashedValueOfTheContractObject = btoa(JSON.stringify(c));
        this.router.navigate(['contracts/editContract', hashedValueOfTheContractObject]);
      }
    });
  }
}
