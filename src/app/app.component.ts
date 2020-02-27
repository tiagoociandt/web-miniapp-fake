import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FakeLocal';
  result = '';
  webkit: any;
  timeLeft = 60;
  interval: any;

  constructor() {
    try {
      this.webkit = (window as any).webkit.messageHandlers;
      window['willSetup'] = function(res) {
        this.result = res;
      };
    } catch (err) {
      this.result = err;
    }
  }

  ngOnInit(): void {
  }

  askMeSetup(): void {
    this.result = 'Aguardando...';
    try {
      this.webkit.askMeSetup.postMessage('');
    } catch (err) {
      this.result = err;
    }
  }

  willSetup(result: string) {
    try {
      this.result = result;
    } catch (err) {
      this.result = err;
    }
  }

  askMeAuthentication() {
    this.result = 'Aguardando...';
    try {
      this.webkit.askMeStartAuth.postMessage('');
    } catch (err) {
      this.result = err;
    }
  }

  willStartAuth(result: any) {
    try {
      this.result = result;
    } catch (err) {
      this.result = err;
    }
  }

  startPaymentsFlow() {
    this.result = 'Aguardando...';
    try {
      const response = {
        amount: 2.0
      };
      this.webkit.startPaymentsFlow.postMessage(JSON.stringify(response));
    } catch (err) {
      this.result = err;
    }
  }

  onPaymentsFlowSuccess(result: any) {
    try {
      this.result = result.toString();
    } catch (err) {
      this.result = err;
    }
  }

  onPaymentsFlowCanceled(result: any) {
    try {
      this.result = result.toString();
    } catch (err) {
      this.result = err;
    }
  }

  onPaymentsFlowError(result: any) {
    try {
      this.result = result.toString();
    } catch (err) {
      this.result = err;
    }
  }

  showLoadingModal() {
    this.result = 'Aguardando...';
    try {
      this.webkit.showLoadingModal.postMessage('');
      this.hideLoadingModal();
    } catch (err) {
      this.result = err;
    }
  }

  hideLoadingModal() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        try {
          this.webkit.hideLoadingModal.postMessage('');
        } catch (err) {
          this.result = err;
        }
      }
    }, 1000);
  }

  closeMiniApp(): void {
    this.result = 'Aguardando...';
    try {
      this.webkit.closeMiniApp.postMessage('');
    } catch (err) {
      this.result = err;
    }
  }

  showScannerCodeReader(): void {
    this.result = 'Aguardando...';
    try {
      this.webkit.showScannerCodeReader.postMessage('');
    } catch (err) {
      this.result = err;
    }
  }

  didFinishScannerCodeReader(result: string): void {
    try {
      this.result = result;
    } catch (err) {
      this.result = err;
    }
  }

  willRedirectFromScannerCodeReader(result: any) {
    this.result = 'redirecto from scanner code';
  }

}
