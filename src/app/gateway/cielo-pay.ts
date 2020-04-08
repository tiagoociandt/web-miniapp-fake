import { Injectable } from '@angular/core';
import { IosGateway } from './ios-gateway';
import { AndroidGateway } from './android-gateway';
import { CieloPayGateway } from './cielo-pay-gateway';
import { SetupModel } from '../model/setup-model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'any'
})
export class CieloPay {

    public setupSubscriber: Subject<SetupModel>;
    public gateway: CieloPayGateway;

    constructor(private iosGateway: IosGateway,
                private androidGateway: AndroidGateway) {
        this.setupSubscriber = new Subject<SetupModel>();
        try {
            this.gateway = androidGateway;
            this.gateway.willSetup = (result: string) => {
                const currentSetup: SetupModel = JSON.parse(result);
                this.setupSubscriber.next(currentSetup);
            };
            this.gateway.askMeSetup();
        } catch {
            console.log('android Error');
        }

        try {
            this.gateway = iosGateway;
            this.gateway.willSetup = (result: string) => {
                const currentSetup: SetupModel = JSON.parse(result);
                this.setupSubscriber.next(currentSetup);
            };
            this.gateway.askMeSetup();
        } catch {
            console.log('iOS Error');
        }
    }
}
