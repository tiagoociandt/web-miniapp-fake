import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Web Mini app Fake';
  result = '';
  webkit: any;
  timeLeft = 60;
  interval: any;

  constructor() {
    try {
      const win = (window as any);
      this.webkit = win.webkit.messageHandlers;
      win.willSetup = (result: string) => this.willSetup(result);
      win.willStartAuth = (result: string) => this.willStartAuth(result);
      win.onPaymentsFlowSuccess = (result: string) => this.onPaymentsFlowSuccess(result);
      win.onPaymentsFlowCanceled = (result: string) => this.onPaymentsFlowCanceled(result);
      win.onPaymentsFlowError = (result: string) => this.onPaymentsFlowError(result);
      win.didFinishScannerCodeReader = (result: string) => this.didFinishScannerCodeReader(result);
      win.willRedirectFromScannerCodeReader = () => this.willRedirectFromScannerCodeReader();
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

  public willSetup(result: string): string {
    try {
      this.result = result;
    } catch (err) {
      this.result = err;
    }
    return this.result;
  }

  askMeAuthentication() {
    this.result = 'Aguardando...';
    try {
      this.webkit.askMeStartAuth.postMessage('');
    } catch (err) {
      this.result = err;
    }
  }

  willStartAuth(result: string): string {
    try {
      this.result = result;
    } catch (err) {
      this.result = err;
    }
    return this.result;
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

  onPaymentsFlowSuccess(result: string): string {
    try {
      this.result = result.toString();
    } catch (err) {
      this.result = err;
    }
    return this.result;
  }

  onPaymentsFlowCanceled(result: string): string {
    try {
      this.result = result.toString();
    } catch (err) {
      this.result = err;
    }
    return this.result;
  }

  onPaymentsFlowError(result: string): string {
    try {
      this.result = result.toString();
    } catch (err) {
      this.result = err;
    }
    return this.result;
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

  didFinishScannerCodeReader(result: string): string {
    try {
      this.result = result;
    } catch (err) {
      this.result = err;
    }
    return this.result;
  }

  willRedirectFromScannerCodeReader(): void {
    this.result = 'redirecto from scanner code';
  }

}
