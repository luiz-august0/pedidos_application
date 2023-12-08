package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.AbstractDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface IAbstractAllController<DTO extends AbstractDTO> extends IAbstractAllGetController {
    @PostMapping
    ResponseEntity insert(@RequestBody DTO dto);

    @DeleteMapping("/{id}")
    ResponseEntity delete(@PathVariable("id") Integer id);

    @PutMapping("/{id}")
    ResponseEntity update(@PathVariable("id") Integer id, @RequestBody DTO dto);
}
