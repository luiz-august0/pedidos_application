package com.pedidosapp.api.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "order_item")
@EqualsAndHashCode(of = "id", callSuper = false)
public class OrderItem extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "order_id", nullable = false)
    @ManyToOne
    private Order order;

    @JoinColumn(name = "product_id", nullable = false)
    @ManyToOne
    private Product product;

    @Column(nullable = false, name = "quantity")
    private BigDecimal quantity;

    @Column(nullable = false, name = "unitary_value")
    private BigDecimal unitaryValue;

    @Column(nullable = false, name = "amount")
    private BigDecimal amount;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "addition")
    private BigDecimal addition;

    @Override
    public String getPortugueseClassName() {
        return "item do pedido";
    }
}