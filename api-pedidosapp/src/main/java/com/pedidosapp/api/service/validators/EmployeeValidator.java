package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.model.entities.Employee;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;

import java.util.ArrayList;
import java.util.List;

public class EmployeeValidator extends AbstractValidator<Employee> {
    public EmployeeValidator() {
        try {
            List<RequiredField> requiredFields = new ArrayList<>();
            requiredFields.add(new RequiredField(Employee.class.getDeclaredField("name"), "nome"));
            requiredFields.add(new RequiredField(Employee.class.getDeclaredField("user"), "usuário"));

            super.addListOfRequiredFields(requiredFields);
        } catch (Exception e) {
            throw new ApplicationGenericsException(e.getMessage());
        }
    }
}