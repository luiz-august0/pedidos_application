package com.pedidosapp.api.config.multitenancy;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.LinkedHashMap;
import java.util.Map;

@ConfigurationProperties(prefix = "tenants")
@Component
public class DataSourceProperties {
 
    private Map<Object, Object> dataSources = new LinkedHashMap<>();
 
    public Map<Object, Object> getDataSources() {
        return dataSources;
    }
 
    public void setDataSources(Map<String, Map<String, String>> datasources) {
        datasources.forEach((key, value) -> this.dataSources.put(key, convert(value)));
    }
 
    public DataSource convert(Map<String, String> source) {
        return DataSourceBuilder.create()
                .url(source.get("jdbcUrl"))
                .driverClassName(source.get("driverClassName"))
                .username(source.get("username"))
                .password(source.get("password"))
                .build();
    }
}