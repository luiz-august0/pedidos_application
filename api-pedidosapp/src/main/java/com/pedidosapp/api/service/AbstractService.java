package com.pedidosapp.api.service;

import com.pedidosapp.api.converter.Converter;
import com.pedidosapp.api.model.dtos.AbstractDTO;
import com.pedidosapp.api.model.entities.AbstractEntity;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;
import com.pedidosapp.api.service.exceptions.ResourceNotFoundException;
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
                Entity extends AbstractEntity, DTO extends AbstractDTO<Entity>>
{
    private final Repository repository;
    private final Entity entity;
    private final DTO dto;

    AbstractService(Repository repository, Entity entity, DTO dto) {
        this.repository = repository;
        this.entity = entity;
        this.dto = dto;
    }

    public List<DTO> findAll() {
        return Converter.convertListEntityToDTO(repository.findAll(), dto.getClass());
    }

    public List<DTO> findAllFiltered(DTO dto) {
        return repository.findAll(dto.toSpec(dto));
    }

    public Page<DTO> findAllFilteredAndPageable(DTO dto, Pageable pageable) {
        return repository.findAll(dto.toSpec(dto), pageable);
    }

    public DTO findAndValidate(Integer id) {
        Optional object = repository.findById(id);

        if (object.isEmpty()) {
            throw new ResourceNotFoundException();
        }

        return (DTO) Converter.convertEntityToDTO((Entity) object.get(), dto.getClass());
    }

    public ResponseEntity insert(DTO object) {
        Object entityObject = Converter.convertDTOToEntity(object, entity.getClass());
        repository.save(entityObject);
        return ResponseEntity.status(HttpStatus.CREATED).body(Converter.convertEntityToDTO((Entity) entityObject, dto.getClass()));
    }

    public ResponseEntity delete(Integer id) {
        this.findAndValidate(id);
        repository.deleteById(id);
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

        repository.save(Converter.convertDTOToEntity(object, entity.getClass()));
        return ResponseEntity.ok().build();
    }
}
