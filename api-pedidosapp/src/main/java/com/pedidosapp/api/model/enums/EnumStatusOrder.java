package com.pedidosapp.api.model.enums;

public enum EnumStatusOrder {
    UNIT("UNIT", "Unidade"),
    KILOGRAM("KILOGRAM", "Kilograma"),
    PACKAGE("PACKAGE", "Pacote");

    private String unit;
    private String name;

    EnumStatusOrder(String unit, String name) {
        this.unit = unit;
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }

    public String getName() {
        return name;
    }
}
