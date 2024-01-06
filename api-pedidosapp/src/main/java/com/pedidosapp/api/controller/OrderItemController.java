package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IOrderItemController;
import com.pedidosapp.api.model.dtos.OrderItemDTO;
import com.pedidosapp.api.service.OrderItemService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderItemController extends AbstractAllController<OrderItemService, OrderItemDTO> implements IOrderItemController {
    OrderItemController(OrderItemService service) {
        super(service);
    }
}
