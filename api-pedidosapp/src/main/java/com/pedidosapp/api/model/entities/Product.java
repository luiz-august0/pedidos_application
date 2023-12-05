package com.pedidosapp.api.model.entities;

import com.pedidosapp.api.model.enums.EnumUnitProduct;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "product")
@EqualsAndHashCode(of = "id")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private EnumUnitProduct unit;

    @Column(nullable = false, name = "unit_value")
    private Double unitValue;

    @Column(name = "stock_quantity")
    private Double stockQuantity;

    @JoinColumn(name = "supplier_id", nullable = false)
    @ManyToOne
    private Supplier supplier;
}