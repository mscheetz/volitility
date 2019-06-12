import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AES } from 'node_modules/crypto-ts'

@Injectable({providedIn: 'root'})
export class HelperService {
    constructor() {}

    token: string = environment.token;

    requestSignature(): string {
        let timestamp = Date.now() * 1000;
        let cypher = AES.encrypt(timestamp.toString(), this.token);

        return cypher.toString();
    }
}