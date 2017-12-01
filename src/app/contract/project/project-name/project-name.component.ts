import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.css']
})
export class ProjectNameComponent implements OnInit {

  @Input()
  projectTitle: string;
  @Input()
  isEditable: boolean;

  @Output() projectTitleChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateProjectTitle() {
    this.projectTitleChange.emit(this.projectTitle);
  }
}
