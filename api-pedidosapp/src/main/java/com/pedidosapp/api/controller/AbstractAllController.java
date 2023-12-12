package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IAbstractAllController;
import com.pedidosapp.api.model.dtos.AbstractDTO;
import com.pedidosapp.api.service.AbstractService;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;

public abstract class AbstractAllController
        <Service extends AbstractService, DTO extends AbstractDTO>
        extends AbstractAllGetController
        implements IAbstractAllController<DTO>, Serializable
{
    private final Service service;

    AbstractAllController(Service service) {
        super(service);
        this.service = service;
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
