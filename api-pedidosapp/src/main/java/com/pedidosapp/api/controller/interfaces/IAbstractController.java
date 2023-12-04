package com.pedidosapp.api.controller.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface IAbstractController<DTO> {
    @GetMapping
    ResponseEntity findAll();

    @GetMapping("/{id}")
    Object findById(@PathVariable("id") Integer id) throws Throwable;

    @PostMapping
    ResponseEntity insert(@RequestBody DTO dto);

    @DeleteMapping("/{id}")
    ResponseEntity delete(@PathVariable("id") Integer id) throws Throwable;

    @PutMapping("/{id}")
    ResponseEntity update(@PathVariable("id") Integer id, @RequestBody DTO dto) throws Throwable;
}
