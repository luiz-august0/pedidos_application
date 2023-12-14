package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.model.entities.Supplier;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "id", callSuper = false)
public class SupplierDTO extends AbstractDTO<Supplier> {
    public SupplierDTO() {
        super(new Supplier());
    }

    public SupplierDTO(Integer id, String name, String socialReason, String cnpj, String cpf, String contact) {
        super(new Supplier());
        this.id = id;
        this.name = name;
        this.socialReason = socialReason;
        this.cnpj = cnpj;
        this.cpf = cpf;
        this.contact = contact;
    }

    private Integer id;

    private String name;

    private String socialReason;

    private String cnpj;

    private String cpf;

    private String contact;
}