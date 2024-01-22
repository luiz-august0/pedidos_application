package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.beans.EmployeeBean;
import com.pedidosapp.api.model.dtos.EmployeeDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pedidosapp.api.constants.endpoints.Endpoints.employee;

@RequestMapping(IEmployeeController.prefixPath + employee)
public interface IEmployeeController extends IAbstractAllGetController<EmployeeDTO> {
    String prefixPath = "${api.prefix.v1}";

    @PostMapping
    ResponseEntity insert(@RequestBody EmployeeBean bean);

    @PutMapping("/{id}")
    ResponseEntity update(@PathVariable("id") Integer id, @RequestBody EmployeeBean bean);

    @PutMapping("/{id}/activate")
    ResponseEntity activateInactivate(@PathVariable("id") Integer id, @RequestParam(value = "active", defaultValue = "true") Boolean active);
}