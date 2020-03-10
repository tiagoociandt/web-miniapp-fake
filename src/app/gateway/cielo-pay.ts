import { Injectable } from '@angular/core';
import { PaymentFlowModel } from '../model/payment-flow-model';
import { Subject } from 'rxjs';
import { SetupModel } from '../model/setup-model';
import { AuthenticationModel } from '../model/authentication-model';
import { $, $$ } from 'protractor';

@Injectable({
    providedIn: 'any'
})
export class CieloPay implements ICieloPay {
    private webkit: any;
    readonly willSetup: Subject<SetupModel>;
    readonly willStartAuth: Subject<AuthenticationModel>;
    readonly onPaymentFlowSuccess: Subject<string>;

    count = 0;

    constructor() {
        try {
            const win = (window as any);
            this.willSetup = new Subject<SetupModel>();
            this.willStartAuth = new Subject<AuthenticationModel>();
            this.onPaymentFlowSuccess = new Subject<string>();
            this.registerGlobalCallback(win);
            this.webkit = win.webkit.messageHandlers;
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
            // this.webkit.startPaymentsFlow.postMessage(JSON.stringify(payment));
            this.onPaymentFlowSuccess.next(`${this.count}`);
            this.count++;
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
            this.webkit.closeMiniApp.postMessage('');
        } catch (err) {
            this.log(err);
        }
    }

    private log(error: Error): void {
        console.log(error.message);
    }

    private registerGlobalCallback(win: any) {
        win.willSetup = (result: string): string => this.willSetupCallback(result);
        win.willStartAuth = (result: string): string => this.willStartAuthCallback(result);
        win.onPaymentsFlowSuccess = (result: string): string => this.onPaymentsFlowSuccessCallback(result);
        win.onPaymentsFlowCanceled = (result: string): string => this.onPaymentsFlowCanceled(result);
        win.onPaymentsFlowError = (result: string): string => this.onPaymentsFlowError(result);
        win.didFinishScannerCodeReader = (result: string): string => this.didFinishScannerCodeReader(result);
        win.willRedirectFromScannerCodeReader = (): void => this.willRedirectFromScannerCodeReader();
    }

    private willSetupCallback(result: string): string {
        if (result) {
            try {
                this.willSetup.next(JSON.parse(result));
                return result;
            } catch (err) {
                this.willSetup.error(err);
            }
        }
        return '';
    }

    private willStartAuthCallback(result: string): string {
        if (result) {
            try {
                const model = JSON.parse(result);
                this.willStartAuth.next(model);
                return result;
            } catch (err) {
                this.willStartAuth.error(err);
            }
        }
        return '';
    }

    private onPaymentsFlowSuccessCallback(result: string): string {
        if (result) {
            try {
                this.onPaymentFlowSuccess.next(result);
                return result;
            } catch (err) {
                this.onPaymentFlowSuccess.error(err);
            }
        }
        return result;
    }

    onPaymentsFlowCanceled(result: string): string {
        return result;
    }

    onPaymentsFlowError(result: string): string {
        return result;
    }

    didFinishScannerCodeReader(result: string): string {
        return result;
    }

    willRedirectFromScannerCodeReader(): void {
    }
}

interface ICieloPay {

    willSetup: Subject<SetupModel>;
    willStartAuth: Subject<AuthenticationModel>;
    onPaymentFlowSuccess: Subject<string>;

    askMeSetup(): void;
    askMeAuth(): void;
    startPaymentsFlow(payment: PaymentFlowModel): void;
    showLoadingModal(): void;
    hideLoadingModal(): void;
    showScannerCodeReader(): void;
    closeMiniApp(): void;
}
