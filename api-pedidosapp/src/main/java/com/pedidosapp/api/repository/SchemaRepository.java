package com.pedidosapp.api.repository;

import com.pedidosapp.api.model.entities.Schema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SchemaRepository extends JpaRepository<Schema, String> {
    @Query(value = "select schema_name as schema from information_schema.schemata " +
            "where schema_name <> 'information_schema' and substring(schema_name, 1, 2) <> 'pg'", nativeQuery = true)
    List<Schema> findAllSchemas();
}
