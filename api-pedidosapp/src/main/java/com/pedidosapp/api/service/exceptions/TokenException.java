package com.pedidosapp.api.service.exceptions;

public class TokenException extends RuntimeException {
    public TokenException() {
        super("Erro ao gerar o token");
    }
}
