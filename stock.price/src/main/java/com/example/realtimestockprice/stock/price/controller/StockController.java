package com.example.realtimestockprice.stock.price.controller;

import com.example.realtimestockprice.stock.price.model.Stock;
import com.example.realtimestockprice.stock.price.repository.StockRepository;
import com.example.realtimestockprice.stock.price.service.AlphaVantageService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:3000") 
public class StockController {

    private final StockRepository stockRepository;
    private final AlphaVantageService alphaVantageService;

    @Autowired
    public StockController(StockRepository stockRepository, AlphaVantageService alphaVantageService) {
        this.stockRepository = stockRepository;
        this.alphaVantageService = alphaVantageService;
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    
    @GetMapping("/{symbol}/price")
    public Double getStockPrice(@PathVariable String symbol) {
        return alphaVantageService.fetchStockPrice(symbol)
                .map(dto -> dto.getPrice())
                .orElse(null);
    }
    @PostConstruct
    public void seedStocks() {
        if (stockRepository.count() == 0) {
            List<Stock> sp500 = Arrays.asList(
                new Stock("AAPL", "Apple Inc.", "NASDAQ"),
                new Stock("MSFT", "Microsoft Corporation", "NASDAQ"),
                new Stock("GOOGL", "Alphabet Inc.", "NASDAQ"),
                new Stock("AMZN", "Amazon.com Inc.", "NASDAQ"),
                new Stock("NVDA", "NVIDIA Corporation", "NASDAQ"),
                new Stock("TSLA", "Tesla Inc.", "NASDAQ"),
                new Stock("META", "Meta Platforms Inc.", "NASDAQ"),
                new Stock("JPM", "JPMorgan Chase & Co.", "NYSE"),
                new Stock("V", "Visa Inc.", "NYSE"),
                new Stock("JNJ", "Johnson & Johnson", "NYSE")
            );
            stockRepository.saveAll(sp500);
        }
    }
}
