import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../shared/student.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StudentService} from '../shared/student.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../shared/group.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  closeResult: string;

  @Input()
  students: Student[];
  @Input()
  groupId: number;
  @Input()
  email: string;

  @Output()
  notify: EventEmitter<number> = new EventEmitter();


  studentGroup: FormGroup;

  constructor(private modalService: NgbModal, private studentService: StudentService,
              private fb: FormBuilder, private groupService: GroupService) {
    this.studentGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
  }

  ableToAddStudent(): boolean {
    return this.email.length >= 2;
  }

  open(content) {
    this.modalService.open(content);
  }

  createStudent() {
    const values = this.studentGroup.value;
    if (this.groupId == null || this.groupId === 0) {
      this.groupService.create(this.email).subscribe(group => {
        this.groupId = group.id;
        // TODO RKL: Refactor out to one method.
        this.studentService.create({firstName: values.firstName, lastName: values.lastName, groupId: this.groupId})
          .subscribe( student => {
            this.students.push(student);
            console.log(student.id + ' ' + student.firstName + ' ' + student.lastName + ' ' + student.groupId);
            // Updating the groupId for the newContract.ts.
            this.notify.emit(this.groupId);
          });
      });
    }else {
      // TODO RKL: Refactor out to one method.
      this.studentService.create({firstName: values.firstName, lastName: values.lastName, groupId: this.groupId})
        .subscribe(student => {
          this.students.push(student);
          console.log(student.id + ' ' + student.firstName + ' ' + student.lastName + ' ' + student.groupId);
        });
    }
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
