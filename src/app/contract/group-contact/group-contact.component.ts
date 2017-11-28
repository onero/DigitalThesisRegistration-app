import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-contact',
  templateUrl: './group-contact.component.html',
  styleUrls: ['./group-contact.component.css']
})
export class GroupContactComponent implements OnInit {

  @Input()
  isEditable: boolean;
  @Input()
  email = '';

  @Output()
  notify: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(email: string) {
    this.email = email;
    this.notify.emit(this.email);
  }
}
