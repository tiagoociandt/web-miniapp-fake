import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationModel } from './model/authentication-model';
import { SetupModel } from './model/setup-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web Mini app Fake';
  guest: AuthenticationModel = null;
  setup: SetupModel = null;

  constructor(private router: Router) {
    this.guest = AuthenticationModel.current;
    this.setup = AuthenticationModel.setup;
  }

  ngOnInit(): void {
    this.router.navigate(['/miniapps']);
  }

}
