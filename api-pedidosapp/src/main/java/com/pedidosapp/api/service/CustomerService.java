package com.pedidosapp.api.service;

import com.pedidosapp.api.model.dtos.CustomerDTO;
import com.pedidosapp.api.model.entities.Customer;
import com.pedidosapp.api.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService extends AbstractService<CustomerRepository, Customer, CustomerDTO> {
    CustomerService(CustomerRepository repository) {
        super(repository, new Customer(), new CustomerDTO());
    }
}