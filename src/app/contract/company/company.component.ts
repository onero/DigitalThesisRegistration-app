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
    this.companyService.getAll().subscribe(c => this.companies = c);
  }


  selectCompany(company: Company) {
    this.company = company;
  }

  createCompany() {
    const values = this.companyGroup.value;
    const company = {
      name: values.name,
      contactName: values.contactName,
      contactEmail: values.contactEmail,
      contactPhone: values.contactPhone
    };
    this.companyService.create(company).subscribe(c => {
      this.company = c;
      this.companyGroup.reset();
    });
  }
}
