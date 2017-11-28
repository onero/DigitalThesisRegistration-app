import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../shared/company.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanyService} from '../shared/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input()
  company: Company;

  companies: Company[];

  constructor(private modalService: NgbModal, private companyService: CompanyService) {
    companyService.getAll().subscribe(c => this.companies = c);
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content);
  }


  selectCompany(company: Company) {
    this.company = company;
  }
}
