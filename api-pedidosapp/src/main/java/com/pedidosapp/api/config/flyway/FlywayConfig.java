package com.pedidosapp.api.config.flyway;

import jakarta.annotation.PostConstruct;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class FlywayConfig {
    @Autowired
    DataSource dataSource;

    @PostConstruct
    public void migrate() {
        List<String> schemas = new ArrayList<>();

        try {
            ResultSet resultSet = dataSource.getConnection().createStatement().executeQuery(
                    " select schema_name as schema from information_schema.schemata " +
                            " where schema_name <> 'information_schema' and substring(schema_name, 1, 2) <> 'pg' "
            );

            while (resultSet.next()) schemas.add(resultSet.getString(1));

        } catch (SQLException e) {
            e.printStackTrace();
        }

        for (String schema : schemas) {
            Flyway.configure().dataSource(dataSource).schemas(schema).load().migrate();
        }
    }
}