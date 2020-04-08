import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationModel } from './model/authentication-model';
import { SetupModel } from './model/setup-model';
import { CieloPay } from './gateway/cielo-pay';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web Mini app Fake';
  guest: AuthenticationModel = null;
  setup: SetupModel = null;

  constructor(private router: Router,
              private cieloPay: CieloPay) {
    this.guest = cieloPay.currentAuthentication;
    this.setup = cieloPay.setup;
  }

  ngOnInit(): void {
    this.router.navigate(['/miniapps']);
  }

}
