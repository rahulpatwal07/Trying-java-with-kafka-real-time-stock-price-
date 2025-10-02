package com.example.realtimestockprice.stock.price.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockPriceUpdateDTO {
    private String symbol;
    private Double price;
    private Long timestamp;
}