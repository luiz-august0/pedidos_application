package com.pedidosapp.api.controller.interfaces;

import com.pedidosapp.api.model.dtos.OrderDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pedidosapp.api.constants.paths.Paths.prefixPath;


@RequestMapping(IOrderController.PATH)
public interface IOrderController extends IAbstractAllGetController<OrderDTO> {
    String PATH = prefixPath + "/order";

    @PostMapping
    ResponseEntity<OrderDTO> insert(@RequestBody OrderDTO orderDTO);

}