package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.model.entities.Order;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;

import java.util.ArrayList;
import java.util.List;

public class OrderItemValidator extends AbstractValidator {
    public OrderItemValidator() {
        try {
            List<RequiredField> requiredFields = new ArrayList<>();
            requiredFields.add(new RequiredField(Order.class.getDeclaredField("description"), "descrição"));
            requiredFields.add(new RequiredField(Order.class.getDeclaredField("unit"), "unidade"));
            requiredFields.add(new RequiredField(Order.class.getDeclaredField("unitaryValue"), "valor unitário"));
            requiredFields.add(new RequiredField(Order.class.getDeclaredField("supplier"), "fornecedor"));

            super.addListOfRequiredFields(requiredFields);
        } catch (Exception e) {
            throw new ApplicationGenericsException(e.getMessage());
        }
    }
}