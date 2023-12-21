package com.pedidosapp.api.service.exceptions;

import org.springframework.http.HttpStatus;

public class ValidatorException extends RuntimeException {
    private HttpStatus status;

    public ValidatorException(String message) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
