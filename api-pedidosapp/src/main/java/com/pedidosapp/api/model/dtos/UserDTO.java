package com.pedidosapp.api.model.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pedidosapp.api.model.entities.User;
import com.pedidosapp.api.model.enums.EnumUserRole;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class UserDTO extends AbstractDTO<User> {
    public UserDTO() {
        super(new User());
    }

    public UserDTO(Integer id, String login, String password, EnumUserRole role) {
        super(new User());
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = role;
    }

    private Integer id;

    private String login;

    @JsonIgnore
    private String password;

    private EnumUserRole role;
}