package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.entities.Product;
import com.pedidosapp.api.model.enums.EnumUnitProduct;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class ProductDTO extends AbstractDTO<Product> {
    public ProductDTO() {
        super(new Product());
    }

    public ProductDTO(Integer id, String description, EnumUnitProduct unit, Double unitValue, Double stockQuantity, SupplierDTO supplier) {
        super(new Product());
        this.id = id;
        this.description = description;
        this.unit = unit;
        this.unitValue = unitValue;
        this.stockQuantity = stockQuantity;
        this.supplier = supplier;
    }

    private Integer id;

    private String description;

    private EnumUnitProduct unit;

    private Double unitValue;

    private Double stockQuantity;

    private SupplierDTO supplier;
}