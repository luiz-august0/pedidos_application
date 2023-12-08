package com.pedidosapp.api.model.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class CustomerDTO extends AbstractDTO {
    private Integer id;

    private String name;

    private String cnpj;

    private String cpf;

    private String contact;
}