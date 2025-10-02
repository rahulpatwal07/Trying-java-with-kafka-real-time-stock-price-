import { useState, useEffect } from 'react';
import axios from 'axios';
import stompClient from './lib/stompClient';
import SearchBar from './components/SearchBar';
import StockGraph from './components/StockGraph';
import StockList from './components/StockList';
import { Stock, StockPriceUpdate } from './type';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string | null>('S&P500');
  const [graphData, setGraphData] = useState<StockPriceUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sp500Symbol = 'AAPL';
  useEffect(() => {
    setLoading(true);
    axios.get<Stock[]>('http://localhost:8080/api/stocks')
      .then(response => {
        const initialStocks = response.data.map(stock => ({ ...stock, price: null }));
        setStocks(initialStocks);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching initial stock list");
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (selectedStockSymbol === 'S&P500') {
      setGraphData([]);
      axios.get(`http://localhost:8080/api/stocks/${sp500Symbol}/price`)
        .then(response => {
          const now = Date.now();
          setGraphData([{ symbol: sp500Symbol, price: response.data, timestamp: now }]);
        })
        .catch(() => {
          setError('Error fetching S&P 500 price');
        });
    }
  }, [selectedStockSymbol]);
  useEffect(() => {
    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/stock-updates', (message: { body: string }) => {
        const update = JSON.parse(message.body) as StockPriceUpdate;
        setStocks(prevStocks =>
          prevStocks.map(stock =>
            stock.symbol === update.symbol ? { ...stock, price: update.price } : stock
          )
        );
        if (selectedStockSymbol !== 'S&P500' && update.symbol === selectedStockSymbol) {
          setGraphData(prevData => {
            const newData = [...prevData, update];
            return newData.length > 50 ? newData.slice(newData.length - 50) : newData;
          });
        }
        if (selectedStockSymbol === 'S&P500' && update.symbol === sp500Symbol) {
          setGraphData(prevData => {
            const newData = [...prevData, update];
            return newData.length > 50 ? newData.slice(newData.length - 50) : newData;
          });
        }
      });
    };
  stompClient.onWebSocketError = () => setError('WebSocket error');
  stompClient.onStompError = (frame: { body: string }) => setError('Broker error: ' + frame.body);
    stompClient.activate();
    return () => {
      stompClient.deactivate();
    };
  }, [selectedStockSymbol]);
  const handleStockSelect = (symbol: string) => {
    setSelectedStockSymbol(symbol);
    setGraphData([]);
    setError(null);
  };

  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-blue-400">Real-Time Stock Ticker</h1>
          <p className="text-center text-gray-400 mt-2">Powered by Spring Boot, Kafka, and React with TypeScript</p>
        </header>
        <main>
          {loading ? (
            <div className="h-96 flex items-center justify-center bg-gray-800 rounded-lg text-gray-400">
              <p>Loading stocks...</p>
            </div>
          ) : error ? (
            <div className="h-96 flex items-center justify-center bg-red-800 rounded-lg text-red-300">
              <p>{error}</p>
            </div>
          ) : (
            <StockGraph data={graphData} selectedStockSymbol={selectedStockSymbol === 'S&P500' ? sp500Symbol : selectedStockSymbol} />
          )}
          <div className="mt-8">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <StockList stocks={filteredStocks} onStockSelect={handleStockSelect} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;