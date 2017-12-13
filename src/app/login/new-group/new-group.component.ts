import { Component, OnInit } from '@angular/core';
// import {GroupService} from '../shared/group.service';
import {Router} from '@angular/router';
import {UserModel} from '../../contract/shared/user.model';
import {LoginService} from '../shared/login.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  user = new UserModel('', '', '');
  submitted = false;

  onSubmit() {this.submitted = true; }

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  create() {
    this.loginService.createGroup(this.user).subscribe(user => {
      this.router.navigateByUrl('login');
    });
  }

}
