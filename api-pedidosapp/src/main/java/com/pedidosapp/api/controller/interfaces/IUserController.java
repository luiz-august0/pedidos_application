package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.constants.endpoints.Endpoints.user;

@RequestMapping(IUserController.prefixPath + user)
public interface IUserController {
    String prefixPath = "${api.prefix.v1}";

    @PostMapping("/register")
    ResponseEntity register(@RequestBody @Valid RegisterDTO registerDTO);
}