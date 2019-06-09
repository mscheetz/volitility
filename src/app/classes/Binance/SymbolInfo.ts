export class SymbolInfo {
    constructor() {}

    symbol: string;
    status: string;
    baseAsset: string;
    baseAssetPrecision: number;
    quoteAsset: string;
    quoteAssetPrecision: number;
    orderTypes: object[];
    icebergAllowed: boolean;
    filters: object[];
}