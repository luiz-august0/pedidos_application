package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.model.entities.AbstractEntity;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;
import com.pedidosapp.api.service.exceptions.ValidatorException;
import com.pedidosapp.api.utils.Utils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.lang.reflect.Field;
import java.util.List;

public abstract class AbstractValidator<Entity extends AbstractEntity> {
    private List<RequiredField> requiredFields;

    public void validate(Entity entity) {
        validateRequiredFields(entity);
    };

    public void validateRequiredFields(Entity entity) {
        requiredFields.forEach(requiredField -> {
            requiredField.getField().setAccessible(true);

            try {
                if (Utils.isEmpty(requiredField.getField().get(entity))) {
                    throw new ValidatorException("O campo " + requiredField.getPortugueseField() + " é obrigatório");
                }
            } catch (IllegalAccessException e) {
                throw new ApplicationGenericsException(e.getMessage());
            }
        });
    }

    public void addListOfRequiredFields(List<RequiredField> fields) {
        requiredFields = fields;
    };

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public class RequiredField {
        private Field field;

        private String portugueseField;
    }
}