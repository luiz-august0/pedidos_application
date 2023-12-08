package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IAbstractAllController;
import com.pedidosapp.api.model.dtos.AbstractDTO;
import com.pedidosapp.api.service.AbstractService;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractAllController<Service extends AbstractService, DTO extends AbstractDTO> implements IAbstractAllController<DTO>, Serializable {
    private final Service service;

    AbstractAllController(Service service) {
        this.service = service;
    }

    public List<DTO> findAll() {
        return service.findAll();
    }

    public DTO findById(Integer id) {
        return (DTO) service.findAndValidate(id);
    }

    public ResponseEntity insert(DTO dto) {
        return service.insert(dto);
    }

    public ResponseEntity delete(Integer id) {
        return service.delete(id);
    }

    public ResponseEntity update(Integer id, DTO dto) {
        return service.update(id, dto);
    }
}
