package com.pedidosapp.api.service;

import com.pedidosapp.api.model.dtos.OrderDTO;
import com.pedidosapp.api.model.entities.Order;
import com.pedidosapp.api.repository.OrderRepository;
import com.pedidosapp.api.service.validators.OrderValidator;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends AbstractService<OrderRepository, Order, OrderDTO, OrderValidator> {
    OrderService(OrderRepository repository) {
        super(repository, new Order(), new OrderDTO(), new OrderValidator());
    }
}