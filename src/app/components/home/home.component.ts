import { Component, OnInit } from '@angular/core';
import { BinanceService } from 'src/app/services/binance-svc.service';
import { SymbolInfo } from 'src/app/classes/Binance/SymbolInfo';
import { Ticker } from 'src/app/classes/Binance/Ticker';
import { Kline } from 'src/app/classes/Binance/Kline';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(private binanceSvc: BinanceService) {}

    symbols: SymbolInfo[] = [];
    tickers: Ticker[] = [];
    klines: Kline[] = [];
    intervals: string[] = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"];
    settingUp: boolean = true;

    ngOnInit(){
        this.getSymbolInfo();
        this.getTickers();
    }

    getSymbolInfo() {
        this.binanceSvc.getExchangeInfo()
            .subscribe(result => {
                this.symbols = result.symbols;
                this.appReady();
            })
    }

    getTickers() {
        this.binanceSvc.getTickers()
            .subscribe(result => {
                this.tickers = result;
                this.appReady();
            })
    }

    appReady() {
        if(this.symbols.length > 0 && this.tickers.length > 0) {
            this.settingUp = false;
        }
    }

    getKlines(pair: string, interval: string) {
        this.klines = [];
        this.binanceSvc.getKline(pair, interval)
            .subscribe(response => {
                this.klines = response;
            });
    }
}