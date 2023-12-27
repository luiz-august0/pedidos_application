package com.pedidosapp.api.service.validators;

import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;
import com.pedidosapp.api.service.exceptions.ValidatorException;
import com.pedidosapp.api.utils.Utils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.lang.reflect.Field;
import java.util.List;

public abstract class AbstractValidator {
    private List<RequiredField> requiredFields;
    private List<CharacterLengthField> characterLengthFields;

    public void validate(Object object) {
        validateRequiredFields(object);
        validateCharacterLengthFields(object);
    };

    public void validateRequiredFields(Object object) {
        if (Utils.isNotEmpty(requiredFields)){
            requiredFields.forEach(requiredField -> {
                requiredField.getField().setAccessible(true);

                try {
                    if (Utils.isEmpty(requiredField.getField().get(object))) {
                        throw new ValidatorException(ValidatorException.mountMessageToRequiredField(requiredField.getPortugueseField()));
                    }
                } catch (IllegalAccessException e) {
                    throw new ApplicationGenericsException(e.getMessage());
                }
            });
        }

    }

    public void validateCharacterLengthFields(Object object) {
        if (Utils.isNotEmpty(characterLengthFields)) {
            characterLengthFields.forEach(characterLengthField -> {
                characterLengthField.getField().setAccessible(true);

                try {
                    if (characterLengthField.getField().getType().equals(String.class)) {
                        if (characterLengthField.getMax()) {
                            if (characterLengthField.getField().get(object).toString().length() > characterLengthField.getValue()) {
                                throw new ValidatorException(ValidatorException.mountMessageToCharacterLengthField(
                                        characterLengthField.getPortugueseField(),
                                        characterLengthField.getValue(),
                                        characterLengthField.getMax()
                                ));
                            }
                        } else {
                            if (characterLengthField.getField().get(object).toString().length() < characterLengthField.getValue()) {
                                throw new ValidatorException(ValidatorException.mountMessageToCharacterLengthField(
                                        characterLengthField.getPortugueseField(),
                                        characterLengthField.getValue(),
                                        characterLengthField.getMax()
                                ));
                            }
                        }
                    }
                } catch (IllegalAccessException e) {
                    throw new ApplicationGenericsException(e.getMessage());
                }
            });
        }
    }

    public void addListOfRequiredFields(List<RequiredField> fields) {
        requiredFields = fields;
    };

    public void addListOfCharacterLengthFields(List<CharacterLengthField> fields) { characterLengthFields = fields; };

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public class RequiredField {
        private Field field;

        private String portugueseField;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public class CharacterLengthField {
        private Field field;

        private Integer value;

        private Boolean max;

        private String portugueseField;
    }
}