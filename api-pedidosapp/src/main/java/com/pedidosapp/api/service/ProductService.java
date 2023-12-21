package com.pedidosapp.api.service;

import com.pedidosapp.api.model.dtos.ProductDTO;
import com.pedidosapp.api.model.entities.Product;
import com.pedidosapp.api.repository.ProductRepository;
import com.pedidosapp.api.service.validators.ProductValidator;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends AbstractService<ProductRepository, Product, ProductDTO, ProductValidator> {
    ProductService(ProductRepository repository) {
        super(repository, new Product(), new ProductDTO(), new ProductValidator());
    }
}