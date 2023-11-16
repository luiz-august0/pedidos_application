package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.enums.UsuarioRole;

public record RegisterDTO(String login, String senha, UsuarioRole role) {
}
