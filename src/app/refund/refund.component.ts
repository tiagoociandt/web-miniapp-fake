import { Component, OnInit } from '@angular/core';
import { CieloPay } from '../gateway/cielo-pay';
import { RefundFlowModel } from '../model/refund-flow-model';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  paymentIdFormControl = new FormControl('', [Validators.required]);
  matcher = new PaymentIDMatcher();

  message: string;

  constructor(private cieloPay: CieloPay,
              private router: Router,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.cieloPay.gateway.onRefundFlowSuccess = (result: string) => {
      this.snack.open(`👍 resultado: ${result}`, '', {
        duration: 2000
      });
    };
    this.cieloPay.gateway.onRefundFlowError = (result: string) => {
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
      refund.paymentId = this.paymentIdFormControl.value;
      this.message = `⏱ start refund with payment ${refund.paymentId}`;
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
