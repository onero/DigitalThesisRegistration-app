import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {LoginService} from '../shared/login.service';
import {Router} from '@angular/router';

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
    const user: User = {username: userName, password: password};
    this.loginService.validateUser(user).subscribe(token => {
      user.token = token;
      localStorage.setItem('Token', token);
      console.log('Got response from loginController');
      console.log(token);
      localStorage.setItem('LoggedIn', 'true');
      this.router.navigateByUrl('home');
    });
  }

  navigatoToGroup() {

  }
}
