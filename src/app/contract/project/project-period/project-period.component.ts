import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../shared/project.model';

@Component({
  selector: 'app-project-period',
  templateUrl: './project-period.component.html',
  styleUrls: ['./project-period.component.css']
})
export class ProjectPeriodComponent implements OnInit {

  dateFormat = 'yyyy-MM-dd';
  @Input()
  isEditable: boolean;
  @Input()
  project: Project;
  startModel;
  @Output()
  startChange: EventEmitter<NgbDateStruct> = new EventEmitter();
  endModel;
  @Output()
  endChange: EventEmitter<NgbDateStruct> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onStartSelected() {
    this.startChange.emit(this.startModel);
  }
  onEndSelected() {
    this.endChange.emit(this.endModel);
  }
}
