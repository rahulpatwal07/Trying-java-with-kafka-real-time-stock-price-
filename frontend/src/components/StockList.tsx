import React from 'react';
import { Stock } from '../type'; 

interface StockListProps {
  stocks: Stock[];
  onStockSelect: (symbol: string) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, onStockSelect }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-6 max-h-96 overflow-y-auto">
      <table className="w-full text-left text-gray-300">
        <thead className="sticky top-0 bg-gray-800">
          <tr className="border-b border-gray-600">
            <th className="p-3">Symbol</th>
            <th className="p-3">Name</th>
            <th className="p-3 text-right">Last Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.symbol}
              className="hover:bg-gray-700 cursor-pointer border-b border-gray-700"
              onClick={() => onStockSelect(stock.symbol)}
            >
              <td className="p-3 font-mono font-bold">{stock.symbol}</td>
              <td className="p-3">{stock.name}</td>
              <td className="p-3 text-right font-mono text-green-400">
                {stock.price ? `$${stock.price.toFixed(2)}` : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;