package com.pedidosapp.api.service;

import com.pedidosapp.api.model.dtos.OrderDTO;
import com.pedidosapp.api.model.entities.Order;
import com.pedidosapp.api.repository.OrderRepository;
import com.pedidosapp.api.service.validators.OrderValidator;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService extends AbstractService<OrderRepository, Order, OrderDTO, OrderValidator> {
    OrderItemService(OrderRepository repository) {
        super(repository, new Order(), new OrderDTO(), new OrderValidator());
    }
}