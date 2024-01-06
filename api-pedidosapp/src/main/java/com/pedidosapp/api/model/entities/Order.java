package com.pedidosapp.api.model.entities;

import com.pedidosapp.api.model.enums.EnumUnitProduct;
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
public class Order extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private EnumUnitProduct unit;

    @Column(nullable = false, name = "unitary_value")
    private BigDecimal unitaryValue;

    @Column(name = "stock_quantity")
    private BigDecimal stockQuantity;

    @JoinColumn(name = "supplier_id", nullable = false)
    @ManyToOne
    private Supplier supplier;

    @Override
    public String getPortugueseClassName() {
        return "produto";
    }
}