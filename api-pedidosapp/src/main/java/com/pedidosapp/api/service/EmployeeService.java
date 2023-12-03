package com.pedidosapp.api.service;

import com.pedidosapp.api.model.entities.Employee;
import com.pedidosapp.api.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService extends AbstractService<EmployeeRepository, Employee> {
    protected EmployeeService(EmployeeRepository repository) {
        super(repository, new Employee());
    }
}