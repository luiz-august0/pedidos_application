package com.pedidosapp.api.config.multitenancy;

import com.pedidosapp.api.model.entities.Schema;
import com.pedidosapp.api.repository.SchemaRepository;
import jakarta.annotation.PostConstruct;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.stream.Collectors;

@Configuration
public class DataSourceConfig {
    @Autowired
    DataSource dataSource;

    @Autowired
    SchemaRepository schemaRepository;

    @PostConstruct
    public void migrate() {
        String[] schemas = schemaRepository.findAllSchemas().stream().map(e -> e.getSchema()).collect(Collectors.toList()).toArray(new String[0]);
        Flyway flyway = Flyway.configure().dataSource(dataSource).schemas(schemas).load();
        flyway.migrate();
    }
}