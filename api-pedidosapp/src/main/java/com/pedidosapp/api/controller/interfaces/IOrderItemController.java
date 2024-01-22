package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.OrderItemDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pedidosapp.api.constants.endpoints.Endpoints.orderItem;

@RequestMapping(IOrderItemController.prefixPath + orderItem)
public interface IOrderItemController extends IAbstractAllGetController<OrderItemDTO> {
    String prefixPath = "${api.prefix.v1}";

    @PostMapping
    ResponseEntity<OrderItemDTO> insert(@RequestBody OrderItemDTO orderItemDTO);

    @PutMapping("/{id}")
    ResponseEntity<OrderItemDTO> update(@PathVariable("id") Integer id, @RequestBody OrderItemDTO orderItemDTO);
}