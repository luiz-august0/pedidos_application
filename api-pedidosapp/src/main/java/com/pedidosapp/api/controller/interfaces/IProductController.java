package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.ProductDTO;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.utils.endpoints.Endpoints.product;

@RequestMapping(product)
public interface IProductController extends IAbstractController<ProductDTO> {
}