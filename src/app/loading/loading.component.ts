import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  timeLeft = 30;
  interval: any;

  constructor() { }

  ngOnInit(): void {
  }

  showLoadingModal() {
    this.hideLoadingModal();
  }

  hideLoadingModal() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        try {
          // this.webkit.hideLoadingModal.postMessage('');
        } catch (err) {
          throw err;
        }
      }
    }, 1000);
  }

}
