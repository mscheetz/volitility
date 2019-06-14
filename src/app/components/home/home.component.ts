import { Component, OnInit, Output } from '@angular/core';
import { NodieService } from 'src/app/services/nodie-svc.service';
import { PairInfo } from 'src/app/classes/Nodie/PairInfo';
import { Ticker } from 'src/app/classes/Nodie/Ticker';
import { Kline } from 'src/app/classes/Nodie/Kline';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(private nodieSvc: NodieService) {}

    exchanges: string[] = ["Binance"];
    selectedExchange: string = "";
    symbols: PairInfo[] = [];
    tickers: Ticker[] = [];
    tableRows: Ticker[] = [];
    tokens: string[] = [];
    markets: string[] = [];
    @Output() klines: Map<string, Kline[]> = new Map<string, Kline[]>();
    @Output() selectedPair: string = "";
    intervals: string[] = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"];
    settingUp: boolean = true;
    @Output() showDetail: boolean = false;

    ngOnInit(){
        this.selectedExchange = this.exchanges[0];
        this.getSymbolInfo();
        this.getTickers();
    }

    getSymbolInfo() {
        this.nodieSvc.getSymbols(this.selectedExchange)
            .subscribe(result => {
                this.symbols = result;
                this.tokens = [...new Set(result.map(i => i.asset))];
                this.markets = [...new Set(result.map(i => i.market))];
                this.appReady();
            })
    }

    getTickers() {
        this.nodieSvc.getTickers(this.selectedExchange)
            .subscribe(result => {
                this.tickers = result;
                this.tableRows = this.tickers;
                this.appReady();
            })
    }

    appReady() {
        if(this.symbols.length > 0 && this.tickers.length > 0) {
            this.settingUp = false;
        }
    }

    getKlines(pair: string, interval: string) {
        this.nodieSvc.getKline(this.selectedExchange, pair, interval)
            .subscribe(response => {
                this.klines.set(interval, response);
                this.showDetail = this.klines.size === 3 ? true : false;
            });
    }

    onRowSelect(selection: any) {
        this.showDetail = false;
        let ticker: Ticker = selection.data;
        this.selectedPair = ticker.pair;
        this.klines = new Map<string, Kline[]>();
        this.getKlines(ticker.pair, "4h");
        this.getKlines(ticker.pair, "1h");
        this.getKlines(ticker.pair, "30m");
        console.log(selection);
    }
}