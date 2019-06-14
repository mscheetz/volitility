import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HelperService } from './helper.service';
import { PairInfo } from '../classes/Nodie/PairInfo';
import { Ticker } from '../classes/Nodie/Ticker';
import { Kline } from '../classes/Nodie/Kline';

@Injectable({providedIn: 'root'})
export class NodieService {
    constructor(private http: HttpClient,
                private helperSvc: HelperService) {}

    base: string = environment.baseUrl;
    user: string = environment.user;
    
    getSymbols(exchange: string): Observable<PairInfo[]> {
        let endpoint: string = "/api/exchange/symbols/" + exchange.toLowerCase();
        let url: string = this.base + endpoint;

        return this.get<PairInfo[]>(url);
    }

    getTickers(exchange: string): Observable<Ticker[]> {
        let endpoint: string = "/api/exchange/tickers/"+ exchange.toLowerCase();
        let url: string = this.base + endpoint;

        return this.get<Ticker[]>(url);
    }

    getKline(exchange: string, pair: string, interval: string): Observable<Kline[]> {
        let endpoint: string = "/api/exchange/klines/"+ exchange.toLowerCase() + "/" + pair +"/"+ interval;
        let url: string = this.base + endpoint;

        return this.get<Kline[]>(url);
    }
    
    get<T>(url: string): Observable<T> {
        let headers = {
            'NODIE-USER': this.user,
            'NODIE-SIGNATURE': this.helperSvc.requestSignature()
        }
        let requestOptions = {
            headers: new HttpHeaders(headers),
        }

        return this.http.get<T>(url, requestOptions);
    }
}