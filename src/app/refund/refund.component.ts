import { Component, OnInit } from '@angular/core';
import { CieloPay } from '../gateway/cielo-pay';
import { RefundFlowModel } from '../model/refund-flow-model';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  paymentIdFormControl = new FormControl('', [Validators.required]);
  matcher = new PaymentIDMatcher();

  message: string;

  constructor(private router: Router,
              private snack: MatSnackBar,
              private cieloPay: CieloPay) {
  }

  ngOnInit(): void {
    this.cieloPay.gateway.onRefundFlowSuccess = (result: string) => {
      this.cieloPay.gateway.hideLoadingModal();
      console.log(result);
      this.snack.open(`👍 resultado: ${result}`, '', {
        duration: 2000
      });
    };
    this.cieloPay.gateway.onRefundFlowError = (result: string) => {
      this.cieloPay.gateway.hideLoadingModal();
      console.log(result);
      this.snack.open(`👎 resultado: ${result}`, '', {
        duration: 2000
      });
    };
  }

  requestRefund() {
    if (!this.paymentIdFormControl.valid) {
      this.message = 'Payment id é obrigatório';
      return;
    }
    if (this.paymentIdFormControl.value) {
      const refund = new RefundFlowModel();
      refund.id = this.paymentIdFormControl.value;
      this.message = `⏱ start refund with payment ${refund.id}`;
      this.cieloPay.gateway.showLoadingModal();
      this.cieloPay.gateway.startRefundFlow(refund);
    } else {
      this.message = 'invalid refund';
    }
  }

  restart() {
    this.paymentIdFormControl.setValue('');
    this.message = null;
  }

  cancel() {
    this.router.navigate(['/miniapps']);
  }

  closeSnack() {
    this.snack._openedSnackBarRef.dismiss();
  }
}

export class PaymentIDMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
