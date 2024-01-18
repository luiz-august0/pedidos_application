package com.pedidosapp.api.model.entities;

import com.pedidosapp.api.model.enums.EnumStatusOrder;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "orders")
@EqualsAndHashCode(of = "id", callSuper = false)
public class Order extends AbstractEntity {
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

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "addition")
    private BigDecimal addition;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private EnumStatusOrder status;

    @Column(nullable = false, name = "inclusion_date")
    private Date inclusionDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    List<OrderItem> items;

    public BigDecimal calculateAmount() {
        BigDecimal amount = BigDecimal.ZERO;

        items.forEach(item -> amount.add(item.getAmount().subtract(item.getDiscount()).add(item.getAddition())));

        return amount;
    }

    @Override
    public String getPortugueseClassName() {
        return "pedido";
    }
}