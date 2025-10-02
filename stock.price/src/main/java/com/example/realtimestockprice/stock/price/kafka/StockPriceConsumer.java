package com.example.realtimestockprice.stock.price.kafka;

import com.example.realtimestockprice.stock.price.dto.StockPriceUpdateDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class StockPriceConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(StockPriceConsumer.class);
    private final SimpMessagingTemplate messagingTemplate;

    public StockPriceConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "${app.kafka.topic.name}", groupId = "${spring.kafka.consumer.group-id}")
    public void consume(StockPriceUpdateDTO message) {
        LOGGER.info(String.format("Consumed -> %s", message));
        messagingTemplate.convertAndSend("/topic/stock-updates", message);
    }
}