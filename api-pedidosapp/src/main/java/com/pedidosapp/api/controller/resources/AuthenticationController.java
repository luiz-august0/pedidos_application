package com.pedidosapp.api.controller.resources;

import com.pedidosapp.api.controller.interfaces.AuthenticationInterfaceController;
import com.pedidosapp.api.model.dtos.AuthenticationDTO;
import com.pedidosapp.api.model.dtos.RegisterDTO;
import com.pedidosapp.api.service.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;

@RestController
public class AuthenticationController implements AuthenticationInterfaceController, Serializable {
    @Autowired
    private AuthenticationService service;

    @Override
    public ResponseEntity login(AuthenticationDTO authenticationDTO) {
        return service.login(authenticationDTO);
    }

    @Override
    public ResponseEntity register(RegisterDTO registerDTO) {
        return service.register(registerDTO);
    }
}
