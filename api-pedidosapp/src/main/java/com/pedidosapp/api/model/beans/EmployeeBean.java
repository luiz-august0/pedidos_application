package com.pedidosapp.api.model.beans;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EmployeeBean extends AbstractBean {
    private String login;

    private String password;

    private String name;

    private String cpf;

    private String contact;
}