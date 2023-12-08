package com.pedidosapp.api.model.entities;

import jakarta.persistence.*;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "employee")
@EqualsAndHashCode(of = "id", callSuper = false)
public class Employee extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(length = 11, unique = true)
    private String cpf;

    @Column(length = 20)
    private String contact;

    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @OneToOne
    private User user;
}