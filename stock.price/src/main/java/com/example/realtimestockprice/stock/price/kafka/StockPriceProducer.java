package com.example.realtimestockprice.stock.price.kafka;
import com.example.realtimestockprice.stock.price.service.AlphaVantageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class StockPriceProducer {

    private static final Logger LOGGER = LoggerFactory.getLogger(StockPriceProducer.class);

    @Value("${app.kafka.topic.name}")
    private String topicName;

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final AlphaVantageService alphaVantageService;
    private final List<String> sp500Symbols = Arrays.asList(
            "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA", "META", "JPM", "V", "JNJ"
    );

    public StockPriceProducer(KafkaTemplate<String, Object> kafkaTemplate, AlphaVantageService alphaVantageService) {
        this.kafkaTemplate = kafkaTemplate;
        this.alphaVantageService = alphaVantageService;
    }
    @Scheduled(fixedDelay = 15000) 
    public void produceStockData() {
        String symbol = sp500Symbols.get((int) (System.currentTimeMillis() / 15000) % sp500Symbols.size());

        alphaVantageService.fetchStockPrice(symbol).ifPresent(update -> {
            LOGGER.info(String.format("Producing -> %s", update));
            kafkaTemplate.send(topicName, update.getSymbol(), update);
        });
    }
}