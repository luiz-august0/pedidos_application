package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.ProductDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.constants.endpoints.Endpoints.product;

@RequestMapping(IProductController.prefixPath + product)
public interface IProductController extends IAbstractAllController<ProductDTO> {
    String prefixPath = "${api.prefix.v1}";

}