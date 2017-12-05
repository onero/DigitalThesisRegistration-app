import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    const loggedIn = localStorage.getItem('LoggedIn');
    if (loggedIn === 'true') {
      console.log('AuthGuard agrees...');
      return true;
    }
    console.log('AuthGuard disagrees...');
    this.router.navigateByUrl('login');
    return false;
  }
}
