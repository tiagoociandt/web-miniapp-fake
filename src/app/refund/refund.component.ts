import { Component, OnInit } from '@angular/core';
import { CieloPay } from '../gateway/cielo-pay';
import { RefundFlowModel } from '../model/refund-flow-model';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  paymentIdFormControl = new FormControl('', [Validators.required]);
  matcher = new PaymentIDMatcher();

  message: string;

  constructor(private gateway: CieloPay,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  requestRefund() {
    if (!this.paymentIdFormControl.valid) {
      this.message = 'Payment id é obrigatório';
      return;
    }
    if (this.paymentIdFormControl.value) {
      const refund = new RefundFlowModel();
      refund.paymentId = this.paymentIdFormControl.value;
      this.message = `start refund with payment ${refund.paymentId}`;
      this.gateway.startRefundFlow(refund);
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
}

export class PaymentIDMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
