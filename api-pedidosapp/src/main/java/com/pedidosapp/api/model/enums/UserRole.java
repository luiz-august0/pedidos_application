package com.pedidosapp.api.model.enums;

public enum UserRole {
    ADMIN("ADMIN"),
    EMPLOYEE("EMPLOYEE");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
