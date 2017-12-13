import { Component, OnInit } from '@angular/core';
import {GroupService} from '../shared/group.service';
import {Router} from '@angular/router';
import {UserModel} from '../shared/user.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  user = new UserModel('', '', '');
  submitted = false;

  onSubmit() {this.submitted = true; }

  constructor(private router: Router, private groupService: GroupService) {
  }

  ngOnInit() {
  }

  create(email: string) {
    this.groupService.create(email).subscribe();
    this.router.navigateByUrl('login');
  }

}
