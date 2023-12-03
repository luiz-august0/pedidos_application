package com.pedidosapp.api.controller;

import com.pedidosapp.api.controller.interfaces.ISupplierController;
import com.pedidosapp.api.model.dtos.SupplierDTO;
import com.pedidosapp.api.service.SupplierService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SupplierController extends AbstractController<SupplierService, SupplierDTO> implements ISupplierController {
    protected SupplierController(SupplierService service) {
        super(service, new SupplierDTO());
    }
}
