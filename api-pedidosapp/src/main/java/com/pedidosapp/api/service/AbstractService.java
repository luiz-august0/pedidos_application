package com.pedidosapp.api.service;

import com.pedidosapp.api.converter.Converter;
import com.pedidosapp.api.model.dtos.AbstractDTO;
import com.pedidosapp.api.model.entities.AbstractEntity;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;
import com.pedidosapp.api.service.exceptions.enums.EnumResourceNotFoundException;
import com.pedidosapp.api.service.validators.AbstractValidator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;


public abstract class AbstractService
        <Repository extends JpaRepository & PagingAndSortingRepository & JpaSpecificationExecutor,
                Entity extends AbstractEntity, DTO extends AbstractDTO<Entity>, Validator extends AbstractValidator>
{
    private final Repository repository;

    private final Entity entity;

    private final DTO dto;

    private final Validator validator;

    AbstractService(Repository repository, Entity entity, DTO dto, Validator validator) {
        this.repository = repository;
        this.entity = entity;
        this.dto = dto;
        this.validator = validator;
    }

    public List<DTO> findAll() {
        return Converter.convertListEntityToDTO(repository.findAll(), dto.getClass());
    }

    public List<DTO> findAllFiltered(DTO dto) {
        return Converter.convertListEntityToDTO(repository.findAll(dto.toSpec((Entity) Converter.convertDTOToEntity(dto, entity.getClass()))), dto.getClass());
    }

    public Page<DTO> findAllFilteredAndPageable(DTO dto, Pageable pageable) {
        return Converter.convertPageEntityToDTO(repository.findAll(dto.toSpec((Entity) Converter.convertDTOToEntity(dto, entity.getClass())), pageable), dto.getClass());
    }

    public DTO findAndValidate(Integer id) {
        Optional object = repository.findById(id);

        if (object.isEmpty()) {
            throw new ApplicationGenericsException(EnumResourceNotFoundException.RESOURCE_NOT_FOUND, entity.getPortugueseClassName(), id);
        }

        return (DTO) Converter.convertEntityToDTO((Entity) object.get(), dto.getClass());
    }

    public ResponseEntity insert(DTO object) {
        Entity entityObject = (Entity) Converter.convertDTOToEntity(object, entity.getClass());
        validator.validate(entityObject);

        repository.save(entityObject);
        return ResponseEntity.status(HttpStatus.CREATED).body(Converter.convertEntityToDTO(entityObject, dto.getClass()));
    }

    public ResponseEntity activateInactivate(Integer id, Boolean active) {
        Entity entityObject = (Entity) Converter.convertDTOToEntity(this.findAndValidate(id), entity.getClass());

        try {
            Field field = entityObject.getClass().getDeclaredField("active");
            field.setAccessible(true);
            field.set(entityObject, active);
        } catch (NoSuchFieldException e) {
            throw new ApplicationGenericsException("Classe " + entity.getClass().getName() + " não tem campo active");
        } catch (IllegalAccessException e) {
            throw new ApplicationGenericsException("Não foi possível acessar o campo active da classe " + entity.getClass().getName());
        }

        repository.save(entityObject);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity update(Integer id, DTO object) {
        this.findAndValidate(id);

        try {
            Class<?> objectClass = object.getClass();
            Field field = objectClass.getDeclaredField("id");
            field.setAccessible(true);
            field.set(object, id);
        } catch (NoSuchFieldException e) {
            throw new ApplicationGenericsException("Classe " + entity.getClass().getName() + " não tem campo ID");
        } catch (IllegalAccessException e) {
            throw new ApplicationGenericsException("Não foi possível acessar o campo id da classe " + entity.getClass().getName());
        }

        Entity entityObject = (Entity) Converter.convertDTOToEntity(object, entity.getClass());
        validator.validate(entityObject);

        repository.save(entityObject);
        return ResponseEntity.ok().build();
    }
}
