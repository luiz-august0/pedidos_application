package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.OrderDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.constants.endpoints.Endpoints.order;

@RequestMapping(order)
public interface IOrderItemController extends IAbstractAllController<OrderDTO> {
}