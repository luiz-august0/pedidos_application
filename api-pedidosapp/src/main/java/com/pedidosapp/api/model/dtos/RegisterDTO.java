package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.enums.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {
}
