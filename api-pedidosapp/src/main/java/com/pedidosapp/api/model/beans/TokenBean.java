package com.pedidosapp.api.model.beans;

import com.pedidosapp.api.model.dtos.EmployeeDTO;
import com.pedidosapp.api.model.enums.EnumUserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenBean extends AbstractBean {
    private Integer userId;

    private String login;

    private EnumUserRole role;

    private EmployeeDTO employee;

    private String accessToken;
}