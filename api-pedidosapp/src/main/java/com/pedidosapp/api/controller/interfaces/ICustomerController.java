package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.CustomerDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.utils.endpoints.Endpoints.customer;

@RequestMapping(customer)
public interface ICustomerController extends IAbstractController<CustomerDTO> {
}