package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.enums.EnumUnitProduct;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class ProductDTO implements Serializable {
    private Integer id;
    private String description;
    private EnumUnitProduct unit;
    private Double unitValue;
    private Double stockQuantity;
    private SupplierDTO supplier;
}