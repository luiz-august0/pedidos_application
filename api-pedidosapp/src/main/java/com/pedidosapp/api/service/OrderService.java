package com.pedidosapp.api.service;

import com.pedidosapp.api.converter.Converter;
import com.pedidosapp.api.model.dtos.OrderDTO;
import com.pedidosapp.api.model.entities.Order;
import com.pedidosapp.api.repository.OrderItemRepository;
import com.pedidosapp.api.repository.OrderRepository;
import com.pedidosapp.api.service.validators.OrderValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends AbstractService<OrderRepository, Order, OrderDTO, OrderValidator> {
    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;

    private final OrderValidator orderValidator;

    OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        super(orderRepository, new Order(), new OrderDTO(), new OrderValidator());
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderValidator = new OrderValidator();
    }

    @Override
    public ResponseEntity<OrderDTO> insert(OrderDTO orderDTO) {
        Order order = Converter.convertDTOToEntity(orderDTO, Order.class);
        orderValidator.validate(order);
        prepareInsert(order);

        orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(Converter.convertEntityToDTO(order, OrderDTO.class));
    }

    @Override
    public ResponseEntity<OrderDTO> update(Integer id, OrderDTO orderDTO) {
        Order order = Converter.convertDTOToEntity(super.findAndValidate(id), Order.class);
        orderValidator.validate(order);
        prepareInsert(order);

        orderRepository.save(order);
        return ResponseEntity.ok().body(Converter.convertEntityToDTO(order, OrderDTO.class));
    }

    private void prepareInsert(Order order) {
        order.setAmount(order.calculateAmount());
    }
}