package com.pedidosapp.api.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "cliente")
@EqualsAndHashCode(of = "id")
public class Cliente implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(length = 14)
    private String cnpj;

    @Column(length = 11)
    private String cpf;

    @Column(length = 20)
    private String contato;
}