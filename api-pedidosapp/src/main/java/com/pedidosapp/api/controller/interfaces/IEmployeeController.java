package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.beans.EmployeeBean;
import com.pedidosapp.api.model.dtos.EmployeeDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pedidosapp.api.utils.endpoints.Endpoints.employee;

@RequestMapping(employee)
public interface IEmployeeController extends IAbstractAllGetController<EmployeeDTO> {
    @PostMapping
    ResponseEntity insert(@RequestBody EmployeeBean bean);

    @PutMapping("/{id}")
    ResponseEntity update(@PathVariable("id") Integer id, @RequestBody EmployeeBean bean);

    @DeleteMapping("/{id}")
    ResponseEntity delete(@PathVariable("id") Integer id);
}