import { Component, OnInit, Input } from '@angular/core';
import { Kline } from 'src/app/classes/Binance/Kline';

@Component({
    selector: 'kline-detail',
    templateUrl: './kline-detail.component.html',
    styleUrls: ['./kline-detail.component.css']
})

export class KlineDetailComponent implements OnInit {
    constructor() {}

    @Input() display: boolean;
    @Input() klines: Map<string, Kline[]>;
    @Input() pair: string;

    ngOnInit(){
    }
}