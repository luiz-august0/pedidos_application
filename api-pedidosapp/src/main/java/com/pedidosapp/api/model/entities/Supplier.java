package com.pedidosapp.api.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "supplier")
@EqualsAndHashCode(of = "id")
public class Supplier implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(name = "social_reason")
    private String socialReason;

    @Column(length = 14, unique = true)
    private String cnpj;

    @Column(length = 11, unique = true)
    private String cpf;

    @Column(length = 20)
    private String contact;

    @JsonIgnore
    @OneToMany(mappedBy = "supplier")
    List<Product> products;
}