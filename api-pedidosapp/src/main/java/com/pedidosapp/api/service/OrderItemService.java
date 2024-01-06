package com.pedidosapp.api.service;

import com.pedidosapp.api.model.dtos.OrderItemDTO;
import com.pedidosapp.api.model.entities.OrderItem;
import com.pedidosapp.api.repository.OrderItemRepository;
import com.pedidosapp.api.service.validators.OrderItemValidator;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService extends AbstractService<OrderItemRepository, OrderItem, OrderItemDTO, OrderItemValidator> {
    OrderItemService(OrderItemRepository repository) {
        super(repository, new OrderItem(), new OrderItemDTO(), new OrderItemValidator());
    }
}