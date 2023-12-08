package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.AbstractDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface IAbstractAllGetController<DTO extends AbstractDTO> {
    @GetMapping
    List<DTO> findAll();

    @GetMapping("/{id}")
    DTO findById(@PathVariable("id") Integer id);
}
