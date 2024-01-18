package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.OrderDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pedidosapp.api.constants.endpoints.Endpoints.order;

@RequestMapping(order)
public interface IOrderController extends IAbstractAllGetController<OrderDTO> {
    @PostMapping
    ResponseEntity<OrderDTO> insert(@RequestBody OrderDTO orderDTO);

    @PutMapping("/{id}")
    ResponseEntity<OrderDTO> update(@PathVariable("id") Integer id, @RequestBody OrderDTO orderDTO);
}