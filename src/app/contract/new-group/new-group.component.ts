import { Component, OnInit } from '@angular/core';
import {GroupService} from '../shared/group.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "./user";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  password: string;
  confirmPassword: string;
  passwordGroup: FormGroup;
  // showPasswordMisMatch = false;

  model = new User('', '', '');
  submitted = false;

  onSubmit() {this.submitted = true; }

  constructor(private router: Router, private groupService: GroupService, private fb: FormBuilder) {
    this.validator();
  }

  private validator() {
    this.passwordGroup = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      // });
    }, {validator: this.confirmPasswordMatchPassword});
  }

  ngOnInit() {
  }

  create(contactEmail: string) {
    this.groupService.create(contactEmail).subscribe();
    this.router.navigateByUrl('login');
  }

  confirmPasswordMatchPassword(group: AbstractControl): boolean {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if (password === confirmPassword) {
      console.log('Password Match!');
      // this.showPasswordMisMatch = false;
      return true;
    }
    console.log('Nope');
    // this.showPasswordMisMatch = true;
    return false;
    // return password === confirmPassword;
  }

  isValid(controlName: string) {
    const control = this.passwordGroup.controls[controlName];

  }

  isPasswordValid(field: string) {
    console.log('Hello');
    const temp = this.passwordGroup.get(field).valid;
    console.log(temp);
    return false;
  }

}
