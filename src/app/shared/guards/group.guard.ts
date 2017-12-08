import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class GroupGuard implements CanActivate {

  canActivate() {
    const role = localStorage.getItem('Role');
    if (role === 'Group') {
      console.log('Guard permits group');
      return true;
    }
    console.log('Guard says this isn\'t a group');
    return false;
  }

}
