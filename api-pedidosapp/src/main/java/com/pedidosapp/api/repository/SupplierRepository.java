package com.pedidosapp.api.repository;

import com.pedidosapp.api.model.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

}