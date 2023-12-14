package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.AbstractDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface IAbstractAllGetController<DTO extends AbstractDTO> {
    @GetMapping
    List<DTO> findAll();

    @GetMapping("/filter")
    List<DTO> findAllFiltered(DTO dto);

    @GetMapping("/filter-pageable")
    Page<DTO> findAllFilteredAndPageable(DTO dto, Pageable pageable);

    @GetMapping("/{id}")
    DTO findById(@PathVariable("id") Integer id);
}
