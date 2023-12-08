package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.enums.EnumUnitProduct;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class ProductDTO extends AbstractDTO {
    private Integer id;

    private String description;

    private EnumUnitProduct unit;

    private Double unitValue;

    private Double stockQuantity;

    private SupplierDTO supplier;
}