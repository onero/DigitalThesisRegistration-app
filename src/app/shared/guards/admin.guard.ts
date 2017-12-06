import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {

  canActivate() {
    const role = localStorage.getItem('Role');
    if (role === 'Administrator') {
      console.log('Guard permits admin');
      return true;
    }
    console.log('Guard says this isn\'t an admin');
    return false;
  }
}
