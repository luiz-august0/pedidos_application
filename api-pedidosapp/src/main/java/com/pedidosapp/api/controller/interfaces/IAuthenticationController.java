package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.AuthenticationDTO;
import com.pedidosapp.api.model.dtos.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pedidosapp.api.utils.endpoints.Endpoints.session;

@RequestMapping(session)
public interface IAuthenticationController {
    @PostMapping("/login")
    ResponseEntity login(@RequestBody @Valid AuthenticationDTO authenticationDTO);

    @PostMapping("/register")
    ResponseEntity register (@RequestBody @Valid RegisterDTO registerDTO);
}