package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.model.entities.Customer;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;

import java.util.ArrayList;
import java.util.List;

public class CustomerValidator extends AbstractValidator {
    public CustomerValidator() {
        try {
            List<RequiredField> requiredFields = new ArrayList<>();
            List<CharacterLengthField> characterLengthFields = new ArrayList<>();
            requiredFields.add(new RequiredField(Customer.class.getDeclaredField("name"), "nome"));
            characterLengthFields.add(new CharacterLengthField(Customer.class.getDeclaredField("name"), 3, false, "nome"));
            characterLengthFields.add(new CharacterLengthField(Customer.class.getDeclaredField("name"), 255, true, "nome"));

            super.addListOfRequiredFields(requiredFields);
            super.addListOfCharacterLengthFields(characterLengthFields);
        } catch (Exception e) {
            throw new ApplicationGenericsException(e.getMessage());
        }
    }
}