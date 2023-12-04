package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.entities.User;
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