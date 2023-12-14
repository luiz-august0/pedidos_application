package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.SupplierDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.utils.endpoints.Endpoints.supplier;

@RequestMapping(supplier)
public interface ISupplierController extends IAbstractAllController<SupplierDTO> {
}