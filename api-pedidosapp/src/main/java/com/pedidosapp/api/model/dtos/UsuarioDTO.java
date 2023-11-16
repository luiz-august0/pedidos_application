package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.enums.UsuarioRole;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class UsuarioDTO implements Serializable {
    private Integer id;
    private String login;
    private String senha;
    private UsuarioRole role;
}