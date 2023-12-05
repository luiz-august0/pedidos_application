package com.pedidosapp.api.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "employee")
@EqualsAndHashCode(of = "id")
public class Employee implements Serializable {
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