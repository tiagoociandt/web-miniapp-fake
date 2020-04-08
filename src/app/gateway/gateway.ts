import { CieloPayGateway } from './cielo-pay-gateway';
import { Injectable } from '@angular/core';
import { RefundFlowModel } from '../model/refund-flow-model';
import { PaymentFlowModel } from '../model/payment-flow-model';

@Injectable({
    providedIn: 'any'
})
export class Gateway implements CieloPayGateway {
    private win = (window as any);
    private webkit: any;

    get willSetup(): any {
        return this.win.willSetup;
    }
    set willSetup(value: any) {
        this.win.willSetup = value;
    }

    get willStartAuth(): any {
        return this.win.willStartAuth;
    }
    set willStartAuth(value: any) {
        this.win.willStartAuth = value;
    }

    get onPaymentFlowSuccess(): any {
        return this.win.onPaymentFlowSuccess;
    }
    set onPaymentFlowSuccess(value: any) {
        this.win.onPaymentFlowSuccess = value;
    }

    get onRefundFlowSuccess(): any {
        return this.win.onRefundFlowSuccess;
    }
    set onRefundFlowSuccess(value: any) {
        this.win.onRefundFlowSuccess = value;
    }

    get onRefundFlowError(): any {
        return this.win.onRefundFlowError;
    }
    set onRefundFlowError(value: any) {
        this.win.onRefundFlowError = value;
    }

    private system = '';

    constructor() {
        try {
            if (this.win.webkit === undefined || this.win.webkit.messageHandlers === undefined) {
                this.webkit = this.win;
                this.system = 'android';
            } else {
                this.webkit = this.win.webkit.messageHandlers;
                this.system = 'ios';
            }
        } catch (err) {
            console.log(err);
        }
    }

    async askMeSetup() {
        try {
            this.webkit.askMeSetup.postMessage('');
        } catch (err) {
            this.log(err);
        }
    }
    async askMeAuth() {
        try {
            this.webkit.askMeStartAuth.postMessage('');
        } catch (err) {
            this.log(err);
        }
    }
    async startPaymentsFlow(payment: PaymentFlowModel) {
        try {
            this.webkit.startPaymentsFlow.postMessage(payment);
        } catch (err) {
            this.log(err);
        }
    }
    async showLoadingModal() {
        try {
            this.webkit.showLoadingModal.postMessage('');
        } catch (err) {
            this.log(err);
        }
    }
    async hideLoadingModal() {
        try {
            this.webkit.hideLoadingModal.postMessage('');
        } catch (err) {
            this.log(err);
        }
    }
    async showScannerCodeReader() {
        try {
            this.webkit.showScannerCodeReader.postMessage('');
        } catch (err) {
            this.log(err);
        }
    }
    async closeMiniApp() {
        try {
            if (this.system === 'ios') {
                this.webkit.closeMiniApp.postMessage('');
            } else {
                this.webkit.closeMiniApp.postMessage();
            }
        } catch (err) {
            this.log(err);
        }
    }
    async startRefundFlow(refund: RefundFlowModel) {
        try {
            const refundRequest = JSON.stringify(refund);
            this.webkit.startRefundFlow.postMessage(refund);
        } catch (err) {
            this.log(err);
        }
    }

    private log(error: Error): void {
        console.log(error.message);
    }
}
