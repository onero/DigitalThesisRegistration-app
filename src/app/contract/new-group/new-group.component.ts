import { Component, OnInit } from '@angular/core';
import {GroupService} from '../shared/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit() {
  }

  create(contactEmail: string) {
    this.groupService.create(contactEmail).subscribe();
    this.router.navigateByUrl('login');
  }

}
