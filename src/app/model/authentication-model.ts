import { SetupModel } from './setup-model';

export class AuthenticationModel {
    name: string;
    email: string;
    document: string;
    phone: string;

    static get current(): AuthenticationModel {
        try {
            const json = window.localStorage.getItem('user');
            const user: AuthenticationModel = JSON.parse(json);
            return user;
        } catch (err) {
            return null;
        }
    }
    static set current(value: AuthenticationModel) {
        const json = JSON.stringify(value);
        window.localStorage.setItem('user', json);
    }

    static get setup(): SetupModel {
        try {
            const json = window.localStorage.getItem('setup');
            const setup: SetupModel = JSON.parse(json);
            return setup;
        } catch (err) {
            return null;
        }
    }
    static set setup(value: SetupModel) {
        const json = JSON.stringify(value);
        window.localStorage.setItem('setup', json);
    }

}
