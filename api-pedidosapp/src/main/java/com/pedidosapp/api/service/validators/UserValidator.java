package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.model.entities.User;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;

import java.util.ArrayList;
import java.util.List;

public class UserValidator extends AbstractValidator<User> {
    public UserValidator() {
        try {
            List<RequiredField> requiredFields = new ArrayList<>();
            requiredFields.add(new RequiredField(User.class.getDeclaredField("login"), "login"));
            requiredFields.add(new RequiredField(User.class.getDeclaredField("password"), "senha"));
            requiredFields.add(new RequiredField(User.class.getDeclaredField("role"), "nivel de acesso"));

            super.addListOfRequiredFields(requiredFields);
        } catch (Exception e) {
            throw new ApplicationGenericsException(e.getMessage());
        }
    }
}