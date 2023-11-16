package com.pedidosapp.api.model.enums;

public enum UsuarioRole {
    ADMIN("ADMIN"),
    FUNCIONARIO("FUNCIONARIO");

    private String role;

    UsuarioRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
