package com.pedidosapp.api.model.dtos;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class CustomerDTO implements Serializable {
    private Integer id;
    private String name;
    private String cnpj;
    private String cpf;
    private String contact;
}