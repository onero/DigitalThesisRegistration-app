import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class ExecutiveGuard implements CanActivate {

  canActivate() {
    const role = localStorage.getItem('Role');
    return role === 'Supervisor' || role === 'Administrator';
  }
}
