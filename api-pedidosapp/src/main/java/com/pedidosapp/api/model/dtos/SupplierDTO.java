package com.pedidosapp.api.model.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class SupplierDTO extends AbstractDTO {
    private Integer id;

    private String name;

    private String socialReason;

    private String cnpj;

    private String cpf;

    private String contact;
}