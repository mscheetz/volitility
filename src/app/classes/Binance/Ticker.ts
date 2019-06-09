export class Ticker {
    constructor() {}

    symbol: string;
    priceChange: number;
    priceChangePercent: number;
    wieghtedAvgPrice: number;
    prevClosePrice: number;
    lastPrice: number;
    lastQty: number;
    bidPrice: number;
    askPrice: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
    quoteVolume: number;
    openTime: number;
    closeTime: number;
    firstId: number;
    lastId: number;
    count: number;
    dailyVolitility: number = 1 - (this.lastPrice/this.openPrice);
    hlVolitility: number = 1 - (this.highPrice/this.lowPrice);
}