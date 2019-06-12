import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticker } from '../classes/Binance/Ticker';
import { Kline } from '../classes/Binance/Kline';
import { ExchangeInfo } from '../classes/Binance/ExchangeInfo';
import { environment } from '../../environments/environment';
import { SymbolInfo } from '../classes/Binance/SymbolInfo';
import { HelperService } from './helper.service';

@Injectable({providedIn: 'root'})
export class BinanceService {
    constructor(private http: HttpClient,
                private helperSvc: HelperService) {}

    base: string = environment.baseUrl;
    user: string = environment.user;

    getExchangeInfo(): Observable<ExchangeInfo> {
        let endpoint: string = "/api/binance/info";
        let url: string = this.base + endpoint;

        return this.get<ExchangeInfo>(url);
    }
    
    getSymbols(): Observable<SymbolInfo[]> {
        let endpoint: string = "/api/binance/symbols";
        let url: string = this.base + endpoint;

        return this.get<SymbolInfo[]>(url);
    }

    getTickers(): Observable<Ticker[]> {
        let endpoint: string = "/api/binance/tickers";
        let url: string = this.base + endpoint;

        return this.get<Ticker[]>(url);
    }

    getKline(pair: string, interval: string): Observable<Kline[]> {
        let endpoint: string = "/api/binance/klines/"+ pair +"/"+ interval;
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