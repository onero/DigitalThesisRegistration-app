import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../shared/company.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanyService} from '../shared/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input()
  company: Company;
  companyGroup: FormGroup;

  companies: Company[];

  constructor(private modalService: NgbModal, private companyService: CompanyService, private fb: FormBuilder) {
    companyService.getAll().subscribe(c => this.companies = c);
    this.setValidators();
  }

  ngOnInit() {
  }

  setValidators() {
    this.companyGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      contactName: ['', [Validators.required, Validators.minLength(2)]],
      contactEmail: ['', [Validators.required, Validators.minLength(5)]],
      contactPhone: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isValid(controlName: string) {
    const control = this.companyGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isInvalid(controlName: string) {
    const control = this.companyGroup.controls[controlName];
    return !control.invalid && (control.dirty || control.touched);
  }

  open(content) {
    this.modalService.open(content);
  }


  selectCompany(company: Company) {
    this.company = company;
  }

  createCompany() {

  }
}
