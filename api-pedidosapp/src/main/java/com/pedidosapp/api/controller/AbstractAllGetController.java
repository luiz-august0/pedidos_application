package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IAbstractAllGetController;
import com.pedidosapp.api.model.dtos.AbstractDTO;
import com.pedidosapp.api.service.AbstractService;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractAllGetController<Service extends AbstractService, DTO extends AbstractDTO> implements IAbstractAllGetController<DTO>, Serializable {
    private final Service service;

    AbstractAllGetController(Service service) {
        this.service = service;
    }

    public List<DTO> findAll() {
        return service.findAll();
    }

    public DTO findById(Integer id) {
        return (DTO) service.findAndValidate(id);
    }
}
