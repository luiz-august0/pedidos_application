package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.entities.Employee;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class EmployeeDTO extends AbstractDTO<Employee> {
    public EmployeeDTO() {
        super(new Employee());
    }

    public EmployeeDTO(Integer id, String name, String cpf, String contact, UserDTO user) {
        super(new Employee());
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.contact = contact;
        this.user = user;
    }

    private Integer id;

    private String name;

    private String cpf;

    private String contact;

    private UserDTO user;
}