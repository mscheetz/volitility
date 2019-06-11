import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticker } from '../classes/Binance/Ticker';
import { Kline } from '../classes/Binance/Kline';
import { ExchangeInfo } from '../classes/Binance/ExchangeInfo';
import { environment } from '../../environments/environment';
import { SymbolInfo } from '../classes/Binance/SymbolInfo';

@Injectable({providedIn: 'root'})
export class BinanceService {
    constructor(private http: HttpClient) {}

    proxy: string = environment.proxy;
    base: string = this.proxy;

    getExchangeInfo(): Observable<ExchangeInfo> {
        let endpoint: string = "/api/info";
        let url: string = this.base + endpoint;

        return this.http.get<ExchangeInfo>(url);
    }
    
    getSymbols(): Observable<SymbolInfo[]> {
        let endpoint: string = "/api/symbols";
        let url: string = this.base + endpoint;

        return this.http.get<SymbolInfo[]>(url);
    }

    getTickers(): Observable<Ticker[]> {
        let endpoint: string = "/api/tickers";
        let url: string = this.base + endpoint;

        return this.http.get<Ticker[]>(url);
    }

    getKline(pair: string, interval: string): Observable<Kline[]> {
        let endpoint: string = "/api/klines/"+ pair +"/"+ interval;
        let url: string = this.base + endpoint;

        return this.http.get<Kline[]>(url);
    }
}