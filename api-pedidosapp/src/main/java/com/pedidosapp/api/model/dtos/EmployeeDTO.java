package com.pedidosapp.api.model.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class EmployeeDTO extends AbstractDTO {
    private Integer id;

    private String name;

    private String cpf;

    private String contact;

    private UserDTO user;
}