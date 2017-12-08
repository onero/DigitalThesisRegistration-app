import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Project} from './project.model';
import {environment} from '../../../environments/environment';

const url = environment.RestAPI + '/projects';

@Injectable()
export class ProjectService {


  constructor(private http: HttpClient) {

  }

  get(id: number): Observable<Project> {
    return this.http.get<Project>(url + '/' + id);
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(url, project);
  }

  update(project: Project): Observable<Project> {
    return this.http.put<Project>(url + '/' + project.id, project);
  }
}
