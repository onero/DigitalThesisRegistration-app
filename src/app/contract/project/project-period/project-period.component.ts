import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-period',
  templateUrl: './project-period.component.html',
  styleUrls: ['./project-period.component.css']
})
export class ProjectPeriodComponent implements OnInit {

  @Input()
  isEditable: boolean;
  startModel;
  endModel;
  constructor() { }

  ngOnInit() {
  }

}
