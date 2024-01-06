package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.OrderItemDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.constants.endpoints.Endpoints.orderItem;

@RequestMapping(orderItem)
public interface IOrderItemController extends IAbstractAllController<OrderItemDTO> {
}