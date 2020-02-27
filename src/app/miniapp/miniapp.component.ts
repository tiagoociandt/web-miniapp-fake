import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-miniapp',
  templateUrl: './miniapp.component.html',
  styleUrls: ['./miniapp.component.css']
})
export class MiniappComponent implements OnInit {
  public payment: PaymentFlowModel;
  result = '';
  webkit: any;
  timeLeft = 60;
  interval: any;
  constructor(private activateRoute: ActivatedRoute,
              private rout: Router) {
    try {
      const win = (window as any);
      this.webkit = win.webkit.messageHandlers;
      win.willSetup = (result: string): string => this.willSetup(result);
      win.willStartAuth = (result: string): string => this.willStartAuth(result);
      win.onPaymentsFlowSuccess = (result: string): string => this.onPaymentsFlowSuccess(result);
      win.onPaymentsFlowCanceled = (result: string): string => this.onPaymentsFlowCanceled(result);
      win.onPaymentsFlowError = (result: string): string => this.onPaymentsFlowError(result);
      win.didFinishScannerCodeReader = (result: string): string => this.didFinishScannerCodeReader(result);
      win.willRedirectFromScannerCodeReader = (): void => this.willRedirectFromScannerCodeReader();
      this.payment = new PaymentFlowModel();
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

  willSetup(result: string): string {
    try {
      this.result = result;
    } catch (err) {
      this.result = err;
    } finally {
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
      this.webkit.startPaymentsFlow.postMessage(JSON.stringify(this.payment));
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
    this.rout.navigate(['/scannerCode']);
  }

}

export class PaymentFlowModel {
  public amount: number;
}