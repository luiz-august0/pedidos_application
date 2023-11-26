package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.ICustomerController;
import com.pedidosapp.api.model.dtos.CustomerDTO;
import com.pedidosapp.api.service.CustomerService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController extends AbstractController<CustomerService, CustomerDTO> implements ICustomerController {
    protected CustomerController(CustomerService service) {
        super(service, new CustomerDTO());
    }
}
