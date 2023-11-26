package com.pedidosapp.api.service;

import com.pedidosapp.api.converter.Converter;
import com.pedidosapp.api.service.exceptions.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Field;
import java.util.List;


public abstract class AbstractService<Repository extends JpaRepository, Entity> {
    private final Repository repository;
    private final Entity entity;


    protected AbstractService(Repository repository, Entity entity) {
        this.repository = repository;
        this.entity = entity;
    }

    public List<Object> findAll() {
        return repository.findAll();
    }

    public Object findById(Integer id) throws Throwable {
        return repository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public void insert(Object object) {
        repository.save(Converter.convertDTOToEntity(object, entity.getClass()));
    }

    public void delete(Integer id) {
        if (!repository.findById(id).isEmpty()) {
            repository.deleteById(id);
        } else {
            throw new ResourceNotFoundException();
        }
    }

    public void update(Integer id, Object object) throws Throwable {
        Object entityObj = repository.findById(id).orElseThrow(ResourceNotFoundException::new);

        Class<?> objectClass = object.getClass();
        Field field = objectClass.getDeclaredField("id");
        field.setAccessible(true);
        field.set(object, id);

        repository.save(Converter.convertDTOToEntity(object, entity.getClass()));
    }
}
