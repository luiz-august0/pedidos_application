package com.pedidosapp.api.repository;

import com.pedidosapp.api.model.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}