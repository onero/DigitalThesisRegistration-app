import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css']
})
export class ProjectDescriptionComponent implements OnInit {

  @Input()
  description: string;
  @Input()
  isEditable: boolean;
  @Output()
  onDescriptionChanged: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  updateProjectDescription() {
    this.onDescriptionChanged.emit(this.description);
  }
}
