import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-contact',
  templateUrl: './group-contact.component.html',
  styleUrls: ['./group-contact.component.css']
})
export class GroupContactComponent implements OnInit {

  @Input()
  isEditable: boolean;
  @Input()
  email: string;

  constructor() {

  }

  ngOnInit() {
  }

}
