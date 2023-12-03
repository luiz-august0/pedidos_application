package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.entities.Employee;
import com.pedidosapp.api.model.enums.UserRole;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class UserDTO implements Serializable {
    private Integer id;
    private String login;
    private String password;
    private UserRole role;
    private Employee employee;
}