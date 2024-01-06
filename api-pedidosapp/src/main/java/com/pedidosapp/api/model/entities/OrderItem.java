package com.pedidosapp.api.model.entities;

import com.pedidosapp.api.model.enums.EnumStatusOrder;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "order")
@EqualsAndHashCode(of = "id", callSuper = false)
public class OrderItem extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "customer_id", nullable = false)
    @ManyToOne
    private Customer customer;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne
    private User user;

    @Column(nullable = false, name = "amount")
    private BigDecimal amount;

    @Column(nullable = false, name = "discount")
    private BigDecimal discount;

    @Column(nullable = false, name = "addition")
    private BigDecimal addition;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private EnumStatusOrder status;

    @Column(nullable = false, name = "inclusion_date")
    private Date inclusionDate;

    @Override
    public String getPortugueseClassName() {
        return "pedido";
    }
}