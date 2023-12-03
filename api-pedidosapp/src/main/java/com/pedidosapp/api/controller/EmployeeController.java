package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.IEmployeeController;
import com.pedidosapp.api.model.dtos.EmployeeDTO;
import com.pedidosapp.api.service.EmployeeService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController extends AbstractController<EmployeeService, EmployeeDTO> implements IEmployeeController {
    protected EmployeeController(EmployeeService service) {
        super(service, new EmployeeDTO());
    }
}
