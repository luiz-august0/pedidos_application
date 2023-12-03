package com.pedidosapp.api.service;

import com.pedidosapp.api.model.entities.Supplier;
import com.pedidosapp.api.repository.SupplierRepository;
import org.springframework.stereotype.Service;

@Service
public class SupplierService extends AbstractService<SupplierRepository, Supplier> {
    protected SupplierService(SupplierRepository repository) {
        super(repository, new Supplier());
    }
}