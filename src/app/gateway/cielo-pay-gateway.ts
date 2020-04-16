import { PaymentFlowModel } from '../model/payment-flow-model';
import { RefundFlowModel } from '../model/refund-flow-model';

export interface CieloPayGateway {

    willSetup: any;
    willStartAuth: any;

    onPaymentsFlowSuccess: any;
    onPaymentsFlowError: any;
    onPaymentsFlowCanceled: any;

    onRefundFlowSuccess: any;
    onRefundFlowError: any;

    askMeSetup(): void;
    askMeAuth(): void;
    startPaymentsFlow(payment: PaymentFlowModel): void;
    showLoadingModal(): void;
    hideLoadingModal(): void;
    showScannerCodeReader(): void;
    closeMiniApp(): void;
    startRefundFlow(refund: RefundFlowModel): void;
}
