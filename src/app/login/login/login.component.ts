import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {LoginService} from '../shared/login.service';
import {Router} from '@angular/router';
import {Contract} from "../../contract/shared/contract.model";
import {ContractService} from "../../contract/shared/contract.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private contractService: ContractService) { }

  ngOnInit() {
  }


  login(userName: string, password: string) {
    const user: User = {username: userName, password: password};
    this.loginService.validateUser(user).subscribe(u => {
      user.token = u.token;
      user.role = u.role;
      localStorage.setItem('Token', u.token);
      localStorage.setItem('LoggedIn', 'true');

      switch (user.role) {
        case 'Admin':
          console.log('Admin login');
          this.router.navigateByUrl('home');
          break;
        case 'Supervisor':
          console.log('Supervisor login');
          this.router.navigateByUrl('contracts');
          break;
        case 'Group':
          console.log('Group login');
          this.contractService.getContractByGroupId(user.group.id).subscribe(c => {
            const hashedValueOfTheContractObject = btoa(JSON.stringify(c));
            this.router.navigateByUrl('contracts/editContract', hashedValueOfTheContractObject);
          });
          break;
        default:
          console.log('Cant find the login');
      }
    });
  }

}
