package com.example.realtimestockprice.stock.price.service;

import com.example.realtimestockprice.stock.price.dto.StockPriceUpdateDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Optional;

@Service
public class AlphaVantageService {

    @Value("${alpha.vantage.api.key}")
    private String apiKey;

    @Value("${alpha.vantage.base.url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Optional<StockPriceUpdateDTO> fetchStockPrice(String symbol) {
        String url = String.format("%s?function=GLOBAL_QUOTE&symbol=%s&apikey=%s", baseUrl, symbol, apiKey);
        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode quote = root.get("Global Quote");

            if (quote != null && !quote.isEmpty()) {
                double price = quote.get("05. price").asDouble();
                return Optional.of(new StockPriceUpdateDTO(symbol, price, System.currentTimeMillis()));
            }
        } catch (IOException | NullPointerException e) {
            System.err.println("Error fetching data for " + symbol + ": " + e.getMessage());
        }
        return Optional.empty();
    }
}