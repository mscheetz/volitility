import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticker } from '../classes/Binance/Ticker';
import { Kline } from '../classes/Binance/Kline';
import { ExchangeInfo } from '../classes/Binance/ExchangeInfo';

@Injectable({providedIn: 'root'})
export class BinanceService {
    constructor(private http: HttpClient) {}

    base: string = "https://api.binance.com";
    httpOptions = {
        headers: new HttpHeaders({
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, content-type"
        })
    };
    // httpOptions = {
    // headers: new HttpHeaders().
    // set('Content-Type', 'application/json').
    // set('Accept', 'application/json').
    // set('Access-Control-Allow-Headers', 'Content-Type').
    // set('Access-Control-Allow-Origin', '*')
    // };

    getExchangeInfo(): Observable<ExchangeInfo> {
        let endpoint: string = "/api/v1/exchangeInfo";
        let url: string = this.base + endpoint;

        return this.http.get<ExchangeInfo>(url, this.httpOptions);
    }

    getTickers(): Observable<Ticker[]> {
        let endpoint: string = "/api/v1/ticker/24hr";
        let url: string = this.base + endpoint;

        return this.http.get<Ticker[]>(url, this.httpOptions);
    }

    getKline(pair: string, interval: string): Observable<Kline[]> {
        let endpoint: string = "/api/v1/klines";
        let qs: string = "?symbol="+ pair +"&interval="+interval;
        let url: string = this.base + endpoint + qs;

        return this.http.get<Kline[]>(url, this.httpOptions);
    }
}