package com.example.realtimestockprice.stock.price.repository;


import com.example.realtimestockprice.stock.price.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, String> {
}