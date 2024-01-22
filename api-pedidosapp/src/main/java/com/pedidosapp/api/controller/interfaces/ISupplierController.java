package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.SupplierDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.constants.endpoints.Endpoints.supplier;

@RequestMapping(ISupplierController.prefixPath + supplier)
public interface ISupplierController extends IAbstractAllController<SupplierDTO> {
    String prefixPath = "${api.prefix.v1}";

}