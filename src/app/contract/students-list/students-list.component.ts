import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../shared/student.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StudentService} from '../shared/student.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  closeResult: string;

  @Input()
  students: Student[];

  studentGroup: FormGroup;

  constructor(private modalService: NgbModal, private studentService: StudentService,
              private fb: FormBuilder) {
    this.studentGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content);
  }

  createStudent() {
    const values = this.studentGroup.value;
    this.studentService.create({firstName: values.firstName, lastName: values.lastName})
      .subscribe( student => console.log(student.id + ' ' + student.firstName + ' ' + student.lastName));
    this.studentGroup.reset();
  }

  isInvalid(controlName: string) {
    const control = this.studentGroup.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  isValid(controlName: string) {
    const control = this.studentGroup.controls[controlName];
    return !control.invalid && (control.touched || control.dirty);
  }
}
