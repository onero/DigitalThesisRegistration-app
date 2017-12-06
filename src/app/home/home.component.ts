import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}


  ngOnInit() {

  }

  logOut() {
    localStorage.setItem('LoggedIn', 'false');
    localStorage.setItem('Role', '');
    localStorage.setItem('Token', '');
    this.router.navigateByUrl('login');
  }

}
