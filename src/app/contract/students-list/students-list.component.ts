import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../shared/student.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  closeResult: string;

  @Input()
  students: Student[];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content);
  }
}
