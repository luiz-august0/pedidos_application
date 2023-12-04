package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IEmployeeController;
import com.pedidosapp.api.model.beans.EmployeeBean;
import com.pedidosapp.api.model.dtos.EmployeeDTO;
import com.pedidosapp.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController extends AbstractController<EmployeeService, EmployeeDTO> implements IEmployeeController {
    @Autowired
    EmployeeService service;

    protected EmployeeController(EmployeeService service) {
        super(service, new EmployeeDTO());
    }

    @Override
    public ResponseEntity insert(EmployeeBean bean) {
        return service.insert(bean);
    }

    @Override
    public ResponseEntity update(Integer id, EmployeeBean bean) throws Throwable {
        return service.update(id, bean);
    }

    @Override
    public ResponseEntity delete(@PathVariable("id") Integer id) throws Throwable {
        return service.deleteById(id);
    }
}
