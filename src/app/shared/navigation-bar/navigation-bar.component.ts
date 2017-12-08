import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('LoggedIn', 'false');
    localStorage.setItem('Role', '');
    localStorage.setItem('Token', '');
    this.router.navigateByUrl('login');
  }

  isLoggedIn() {
    return localStorage.getItem('Token') !== '' ? true : false;
  }
}
