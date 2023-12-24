package com.pedidosapp.api.service.exceptions.enums;

public enum EnumGenericsException {
    GENERATE_TOKEN("Ocorreu um erro ao gerar o token"),
    VALIDATE_TOKEN("Ocorreu um erro ao validar o token"),
    EXPIRED_TOKEN("Token expirado, realize o login novamente"),
    TOKEN_NULL("Não foi informado token no header da requisição");
    private final String message;

    EnumGenericsException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
