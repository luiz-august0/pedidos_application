package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IAbstractController;
import com.pedidosapp.api.converter.Converter;
import com.pedidosapp.api.service.AbstractService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;

public abstract class AbstractController<Service extends AbstractService, DTO> implements IAbstractController<DTO>, Serializable {
    private final Service service;
    private final DTO dto;

    protected AbstractController(Service service, DTO dto) {
        this.service = service;
        this.dto = dto;
    }

    public ResponseEntity findAll() {
        return ResponseEntity.ok(Converter.convertListEntityToDTO(service.findAll(), dto.getClass()));
    }

    public Object findById(Integer id) throws Throwable {
        return Converter.convertEntityToDTO(service.findById(id), dto.getClass());
    }

    public ResponseEntity insert(DTO dto) {
        service.insert(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public ResponseEntity delete(Integer id) throws Throwable {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity update(Integer id, DTO dto) throws Throwable {
        service.update(id, dto);
        return ResponseEntity.ok().build();
    }
}
