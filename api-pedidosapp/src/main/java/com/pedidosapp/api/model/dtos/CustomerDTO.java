package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.entities.Customer;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class CustomerDTO extends AbstractDTO<Customer> {
    public CustomerDTO() {
        super(new Customer());
    }

    public CustomerDTO(Integer id, String name, String cnpj, String cpf, String contact) {
        super(new Customer());
        this.id = id;
        this.name = name;
        this.cnpj = cnpj;
        this.cpf = cpf;
        this.contact = contact;
    }

    private Integer id;

    private String name;

    private String cnpj;

    private String cpf;

    private String contact;
}