import { SymbolInfo } from './SymbolInfo';

export class ExchangeInfo {
    constructor() {}

    timezone: string;
    serverTime: number;
    rateLimits: object[];
    exchangeFilters: object[];
    symbols: SymbolInfo[];
}