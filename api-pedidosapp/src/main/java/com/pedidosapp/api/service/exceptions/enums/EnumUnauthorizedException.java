package com.pedidosapp.api.service.exceptions.enums;

public enum EnumUnauthorizedException {
    USER_ALREADY_REGISTERED("Usuário já cadastrado"),
    WRONG_CREDENTIALS("Usuário ou senha incorretos");
    private final String message;

    EnumUnauthorizedException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
