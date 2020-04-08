import { Injectable } from '@angular/core';
import { CieloPayGateway } from './cielo-pay-gateway';
import { SetupModel } from '../model/setup-model';
import { AuthenticationModel } from '../model/authentication-model';
import { Gateway } from './gateway';

@Injectable({
    providedIn: 'any'
})
export class CieloPay {

    public gateway: CieloPayGateway;

    get currentAuthentication(): AuthenticationModel {
        try {
            const json = window.localStorage.getItem('user');
            const user: AuthenticationModel = JSON.parse(json);
            return user;
        } catch (err) {
            return null;
        }
    }
    set currentAuthentication(value: AuthenticationModel) {
        const json = JSON.stringify(value);
        window.localStorage.setItem('user', json);
    }

    get setup(): SetupModel {
        try {
            const json = window.localStorage.getItem('setup');
            const setup: SetupModel = JSON.parse(json);
            return setup;
        } catch (err) {
            return null;
        }
    }
    set setup(value: SetupModel) {
        const json = JSON.stringify(value);
        window.localStorage.setItem('setup', json);
    }

    constructor(private nativeGateway: Gateway) {
        this.gateway = nativeGateway;
    }
}
