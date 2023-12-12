package com.pedidosapp.api.service.exceptions;

import com.pedidosapp.api.service.exceptions.enums.EnumGenericsException;
import com.pedidosapp.api.service.exceptions.enums.EnumUnauthorizedException;
import org.springframework.http.HttpStatus;

public class ApplicationGenericsException extends RuntimeException {
    private HttpStatus status;

    public ApplicationGenericsException(String message) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public ApplicationGenericsException(EnumGenericsException exception) {
        super(exception.getMessage());
        this.status = HttpStatus.BAD_REQUEST;
    }

    public ApplicationGenericsException(EnumUnauthorizedException exception) {
        super(exception.getMessage());
        this.status = HttpStatus.UNAUTHORIZED;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
