
export interface Stock {
  symbol: string;
  name: string;
  exchange: string;
  price: number | null; 
}

export interface StockPriceUpdate {
  symbol: string;
  price: number;
  timestamp: number;
}