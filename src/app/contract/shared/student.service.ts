import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Student} from './student.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

const url = environment.RestAPI + '/students';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) {}

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(url, student);
  }

  get(id: number): Observable<Student> {
    return this.http.get<Student>(url + '/' + id);
  }
}
