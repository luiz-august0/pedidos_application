package com.pedidosapp.api.service.security;

import com.pedidosapp.api.model.dtos.AuthenticationDTO;
import com.pedidosapp.api.model.dtos.RegisterDTO;
import com.pedidosapp.api.model.entities.User;
import com.pedidosapp.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Service
public class AuthenticationService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    public ResponseEntity login(AuthenticationDTO authenticationDTO) {
        var loginPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.login(), authenticationDTO.password());
        try {
            var session = authenticationManager.authenticate(loginPassword);
            var token = tokenService.generateToken((User) session.getPrincipal());
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            if (e.getClass() == BadCredentialsException.class || e.getClass() == InternalAuthenticationServiceException.class) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCause());
            }
        }
    }

    public ResponseEntity register(RegisterDTO registerDTO) {
        if(repository.findByLogin(registerDTO.login()) != null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário já cadastrado");

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
        User user = new User(registerDTO.login(), encryptedPassword, registerDTO.role());
        repository.save(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
