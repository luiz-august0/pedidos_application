package com.pedidosapp.api.repository;

import com.pedidosapp.api.model.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {

}