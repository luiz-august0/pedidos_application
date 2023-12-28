package com.pedidosapp.api.service;

import com.pedidosapp.api.model.dtos.RegisterDTO;
import com.pedidosapp.api.model.entities.User;
import com.pedidosapp.api.repository.UserRepository;
import com.pedidosapp.api.service.validators.UserValidator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Service
public class UserService {
    private final UserRepository repository;

    private final UserValidator validator;

    public UserService(UserRepository repository) {
        this.repository = repository;
        this.validator = new UserValidator(repository);
    }

    public ResponseEntity register(RegisterDTO registerDTO) {
        validator.validate(registerDTO);

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
        User user = new User(registerDTO.login(), encryptedPassword, registerDTO.role());
        repository.save(user);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}