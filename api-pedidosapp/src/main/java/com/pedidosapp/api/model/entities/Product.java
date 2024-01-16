package com.pedidosapp.api.model.entities;

import com.pedidosapp.api.model.enums.EnumUnitProduct;
import com.pedidosapp.api.utils.Utils;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "product")
@EqualsAndHashCode(of = "id", callSuper = false)
public class Product extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false, length = 50)
    private EnumUnitProduct unit;

    @Column(nullable = false, name = "unitary_value")
    private BigDecimal unitaryValue;

    @Column(name = "stock_quantity")
    private BigDecimal stockQuantity;

    @JoinColumn(name = "supplier_id", nullable = false)
    @ManyToOne
    private Supplier supplier;

    @Column(nullable = false)
    private Boolean active;

    @PrePersist
    @PreUpdate
    protected void onPersist() {
        if (Utils.isEmpty(active)) this.active = true;
    }

    @Override
    public String getPortugueseClassName() {
        return "produto";
    }
}