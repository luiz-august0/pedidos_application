package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IOrderController;
import com.pedidosapp.api.model.dtos.OrderDTO;
import com.pedidosapp.api.service.OrderService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController extends AbstractAllController<OrderService, OrderDTO> implements IOrderController {
    OrderController(OrderService service) {
        super(service);
    }
}
