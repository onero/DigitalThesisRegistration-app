import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    this.checkIfLoggedIn();
  }

  ngOnInit() {
  }

  checkIfLoggedIn() {
    const status = localStorage.getItem('LoggedIn');
    if (!status || status == null) {
      console.log('Redirecting from home');
      this.router.navigateByUrl('login');
    }
  }

}
