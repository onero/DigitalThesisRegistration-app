import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {LoginService} from '../shared/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(userName: string, password: string) {
    const user: User = {userName: userName, password: password};
    const loggedIn = this.loginService.mockLoginValidate(user);
    if (loggedIn) {
      this.navigatoToGroup();
    }
  }

  navigatoToGroup() {
    this.router.navigateByUrl('home');
  }
}
