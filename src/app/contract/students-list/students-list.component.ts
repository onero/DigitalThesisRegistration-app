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

  studentsToSelectFrom: Student[];

  @Input()
  students: Student[];
  @Input()
  groupId: number;
  @Input()
  email: string;
  @Input()
  isEditable: boolean;

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
    // TODO: Changes this to call the restAPI for a method that only contains students not in a group.
    this.studentService.getAll().subscribe(s => this.studentsToSelectFrom = s);
    this.modalService.open(content);
  }

  handleUpdateStudentButton(student: Student) {
    const values = this.studentGroup.value;
    // Checking if the new contract don't have a group. If true, creates a new group for the contract.
    if (this.groupId == null || this.groupId === 0) {
      this.groupService.create(this.email).subscribe(group => {
        this.groupId = group.id;
        this.updateStudent(student);
        this.notify.emit(this.groupId);
      });
    }else {
      this.updateStudent(student);
    }
    this.studentGroup.reset();
  }

  // This is the call to the RestAPI where the student is created in the database.
  private updateStudent(student: Student) {
    student.groupId = this.groupId;
    this.studentService.update(student)
      .subscribe(s => {
        this.students.push(s);
        console.log(s.id + ' ' + s.firstName + ' ' + s.lastName + ' ' + s.groupId);
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
