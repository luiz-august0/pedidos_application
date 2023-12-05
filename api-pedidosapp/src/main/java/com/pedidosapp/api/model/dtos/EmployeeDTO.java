package com.pedidosapp.api.model.dtos;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class EmployeeDTO implements Serializable {
    private Integer id;
    private String name;
    private String cpf;
    private String contact;
    private UserDTO user;
}