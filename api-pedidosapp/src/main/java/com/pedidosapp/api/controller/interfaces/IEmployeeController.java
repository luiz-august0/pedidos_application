package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.EmployeeDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.utils.endpoints.Endpoints.employee;

@RequestMapping(employee)
public interface IEmployeeController extends IAbstractController<EmployeeDTO> {
}