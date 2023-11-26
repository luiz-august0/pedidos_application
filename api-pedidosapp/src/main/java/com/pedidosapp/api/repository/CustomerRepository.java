package com.pedidosapp.api.repository;

import com.pedidosapp.api.model.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}