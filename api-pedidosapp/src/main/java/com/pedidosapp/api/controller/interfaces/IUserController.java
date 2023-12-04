package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.AuthenticationDTO;
import com.pedidosapp.api.model.dtos.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.utils.endpoints.Endpoints.user;

@RequestMapping(user)
public interface IUserController {
    @PostMapping("/register")
    ResponseEntity register(@RequestBody @Valid RegisterDTO registerDTO);
}