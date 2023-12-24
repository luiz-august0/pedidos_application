package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.model.entities.Supplier;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;

import java.util.ArrayList;
import java.util.List;

public class SupplierValidator extends AbstractValidator<Supplier> {
    public SupplierValidator() {
        try {
            List<RequiredField> requiredFields = new ArrayList<>();
            requiredFields.add(new RequiredField(Supplier.class.getDeclaredField("name"), "nome"));

            super.addListOfRequiredFields(requiredFields);
        } catch (Exception e) {
            throw new ApplicationGenericsException(e.getMessage());
        }
    }
}