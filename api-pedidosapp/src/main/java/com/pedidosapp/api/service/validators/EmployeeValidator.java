package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.model.entities.Customer;
import com.pedidosapp.api.model.entities.Employee;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;

import java.util.ArrayList;
import java.util.List;

public class EmployeeValidator extends AbstractValidator<Employee> {
    public EmployeeValidator() {
        try {
            List<RequiredField> requiredFields = new ArrayList<>();
            requiredFields.add(new RequiredField(Customer.class.getDeclaredField("name"), "nome"));

            super.addListOfRequiredFields(requiredFields);
        } catch (Exception e) {
            throw new ApplicationGenericsException(e.getMessage());
        }
    }
}