import {Company} from './company.model';
import {Observable} from "rxjs/Observable";

export class CompanyService {
  mockCompany: Company[] = [
    {id: 1, name: 'Mr. Nice0', contactName: 'Contactname0', contactEmail: 'email0', contactPhone: '123'},
    {id: 2, name: 'Mr. Nice1', contactName: 'Contactname1', contactEmail: 'email1', contactPhone: '123'},
    {id: 3, name: 'Mr. Nice2', contactName: 'Contactname2', contactEmail: 'email2', contactPhone: '123'},
    {id: 4, name: 'Mr. Nice3', contactName: 'Contactname3', contactEmail: 'email3', contactPhone: '123'},
    {id: 5, name: 'Mr. Nice4', contactName: 'Contactname4', contactEmail: 'email4', contactPhone: '123'},
  ];

  get(id: number) {
    return this.mockCompany.find(c => c.id === id);
  }


}
