package com.pedidosapp.api.controller.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/teste")
public class TesteController {
    @GetMapping
    public ResponseEntity teste() {
        return ResponseEntity.ok().body("TESTE");
    }
}
