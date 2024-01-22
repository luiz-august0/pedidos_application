package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.CustomerDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.constants.endpoints.Endpoints.customer;

@RequestMapping(ICustomerController.prefixPath + customer)
public interface ICustomerController extends IAbstractAllController<CustomerDTO> {
    String prefixPath = "${api.prefix.v1}";

}