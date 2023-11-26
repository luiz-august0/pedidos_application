package com.pedidosapp.api.converter;

import org.modelmapper.ModelMapper;

import java.util.List;

public class Converter {
    private static final ModelMapper mapper = new ModelMapper();

    public static<Entity, DTO> DTO convertEntityToDTO(Entity entity, Class<DTO> dtoClass) {
        return mapper.map(entity, dtoClass);
    }

    public static<Entity, DTO> Entity convertDTOToEntity(DTO dto, Class<Entity> entityClass) {
        return mapper.map(dto, entityClass);
    }

    public static<Entity, DTO> List<?> convertListEntityToDTO(List<Entity> entityList, Class<DTO> dtoClass) {
        return entityList.stream().map(entity -> convertEntityToDTO(entity, dtoClass)).toList();
    }

    public static<Entity, DTO> List<?> convertListDTOToEntity(List<DTO> dtoList, Class<Entity> entityClass) {
        return dtoList.stream().map(dto -> convertDTOToEntity(dto, entityClass)).toList();
    }
}