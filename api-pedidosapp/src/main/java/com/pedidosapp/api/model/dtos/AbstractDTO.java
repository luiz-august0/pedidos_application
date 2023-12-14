package com.pedidosapp.api.model.dtos;

import com.pedidosapp.api.converter.Converter;
import com.pedidosapp.api.model.entities.AbstractEntity;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;
import com.pedidosapp.api.utils.Utils;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import javax.xml.stream.events.DTD;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public abstract class AbstractDTO<Entity extends AbstractEntity> implements Serializable {
    private final Entity entity;

    public AbstractDTO(Entity entity) {
        this.entity = entity;
    }

    public Specification<Entity> toSpec(AbstractDTO<Entity> dto) {
        Object entityObject = Converter.convertDTOToEntity(dto, entity.getClass());

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            Field[] fields = entity.getClass().getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);

                try {
//                    switch (field.getType()) {
//                        case String.class:
//                            stringSpec(predicates, field.get(entity).toString(), field.getName(), root, query, criteriaBuilder);
//                            break;
//                        default:
//                            break;
//                    }

                    if (field.getType().equals(String.class)) {
                        stringSpec(predicates, field.get(entityObject), field.getName(), root, query, criteriaBuilder);
                    }

                } catch (Exception e) {
                    throw new ApplicationGenericsException(e.getMessage());
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private void stringSpec(List<Predicate> predicates, Object field, String fieldName, Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
        if (Utils.isNotEmpty(field)) {
            Path<String> fieldSpec = root.<String>get(fieldName);
            Predicate predicate = criteriaBuilder.like(fieldSpec, "%"+field+"%");
            predicates.add(predicate);
        }
    }
}
