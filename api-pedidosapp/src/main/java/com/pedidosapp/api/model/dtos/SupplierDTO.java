package com.pedidosapp.api.model.dtos;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class SupplierDTO implements Serializable {
    private Integer id;
    private String name;
    private String socialReason;
    private String cnpj;
    private String cpf;
    private String contact;
}