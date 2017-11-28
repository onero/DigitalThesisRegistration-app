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

  handleCreateStudentButton() {
    const values = this.studentGroup.value;
    // Checking if the new contract don't have a group. If true, creates a new group for the contract.
    if (this.groupId == null || this.groupId === 0) {
      this.groupService.create(this.email).subscribe(group => {
        this.groupId = group.id;
        this.createStudent(values);
        this.notify.emit(this.groupId);
      });
    }else {
      this.createStudent(values);
    }
    this.studentGroup.reset();
  }

  // This is the call to the RestAPI where the student is created in the database.
  private createStudent(values: any) {
    this.studentService.create({firstName: values.firstName, lastName: values.lastName, groupId: this.groupId})
      .subscribe(student => {
        this.students.push(student);
        console.log(student.id + ' ' + student.firstName + ' ' + student.lastName + ' ' + student.groupId);
      });
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
