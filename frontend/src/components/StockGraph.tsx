import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockPriceUpdate } from '../type'; 

interface StockGraphProps {
  data: StockPriceUpdate[];
  selectedStockSymbol: string | null;
}

const StockGraph: React.FC<StockGraphProps> = ({ data, selectedStockSymbol }) => {
  if (!selectedStockSymbol || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400">
        <p>Select a stock from the list below to see its graph.</p>
      </div>
    );
  }
  const chartData = data.map((d: StockPriceUpdate) => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString()
  }));

  return (
    <div className="h-96 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">
        {selectedStockSymbol} Real-Time Price
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="time" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#4299E1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockGraph;