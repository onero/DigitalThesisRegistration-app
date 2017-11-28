import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../shared/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input()
  company: Company;
  @Input()
  isEditable: boolean;

  constructor() { }

  ngOnInit() {
  }


}
