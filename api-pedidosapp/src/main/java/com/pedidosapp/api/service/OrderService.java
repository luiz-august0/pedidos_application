package com.pedidosapp.api.service;

import com.pedidosapp.api.model.dtos.CustomerDTO;
import com.pedidosapp.api.model.entities.Customer;
import com.pedidosapp.api.repository.CustomerRepository;
import com.pedidosapp.api.service.validators.CustomerValidator;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends AbstractService<CustomerRepository, Customer, CustomerDTO, CustomerValidator> {
    OrderService(CustomerRepository repository) {
        super(repository, new Customer(), new CustomerDTO(), new CustomerValidator(repository));
    }
}