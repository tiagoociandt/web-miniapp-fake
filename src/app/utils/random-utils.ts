import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'any'
})
export class RandomUtils {

    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;\'[]\=-)(*&^%$#@!~`';

    constructor() {
    }
    makeRandom(lengthOfCode: number, possible: string): string {
        let text = '';
        for (let i = 0; i < lengthOfCode; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

export interface IRandomUtils {
    makeRandom(lengthOfCode: number, possible: string): string;
}
