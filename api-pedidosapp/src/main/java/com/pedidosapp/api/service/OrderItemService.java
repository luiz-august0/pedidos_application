package com.pedidosapp.api.service;

import com.pedidosapp.api.converter.Converter;
import com.pedidosapp.api.model.dtos.OrderItemDTO;
import com.pedidosapp.api.model.entities.OrderItem;
import com.pedidosapp.api.repository.OrderItemRepository;
import com.pedidosapp.api.service.validators.OrderItemValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService extends AbstractService<OrderItemRepository, OrderItem, OrderItemDTO, OrderItemValidator> {

    private final OrderItemRepository orderItemRepository;

    private final OrderItemValidator orderItemValidator;

    OrderItemService(OrderItemRepository orderItemRepository) {
        super(orderItemRepository, new OrderItem(), new OrderItemDTO(), new OrderItemValidator());
        this.orderItemRepository = orderItemRepository;
        this.orderItemValidator = new OrderItemValidator();
    }

    @Override
    public ResponseEntity<OrderItemDTO> insert(OrderItemDTO orderItemDTO) {
        OrderItem orderItem = Converter.convertDTOToEntity(orderItemDTO, OrderItem.class);
        orderItemValidator.validate(orderItem);
        prepareInsert(orderItem);

        orderItemRepository.save(orderItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(Converter.convertEntityToDTO(orderItem, OrderItemDTO.class));
    }

    @Override
    public ResponseEntity<OrderItemDTO> update(Integer id, OrderItemDTO orderItemDTO) {
        OrderItem orderItem = Converter.convertDTOToEntity(super.findAndValidate(id), OrderItem.class);
        orderItemValidator.validate(orderItem);
        prepareInsert(orderItem);

        orderItemRepository.save(orderItem);
        return ResponseEntity.ok().body(Converter.convertEntityToDTO(orderItem, OrderItemDTO.class));
    }

    private void prepareInsert(OrderItem orderItem) {

    }
}