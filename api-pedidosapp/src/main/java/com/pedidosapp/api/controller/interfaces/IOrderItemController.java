package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.OrderItemDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pedidosapp.api.constants.endpoints.Endpoints.orderItem;

@RequestMapping(orderItem)
public interface IOrderItemController extends IAbstractAllGetController<OrderItemDTO> {
    @PostMapping
    ResponseEntity<OrderItemDTO> insert(@RequestBody OrderItemDTO orderItemDTO);

    @PutMapping("/{id}")
    ResponseEntity<OrderItemDTO> update(@PathVariable("id") Integer id, @RequestBody OrderItemDTO orderItemDTO);
}