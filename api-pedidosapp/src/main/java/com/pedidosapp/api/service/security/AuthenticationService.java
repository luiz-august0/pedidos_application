package com.pedidosapp.api.service.security;

import com.pedidosapp.api.model.dtos.AuthenticationDTO;
import com.pedidosapp.api.model.entities.User;
import com.pedidosapp.api.service.exceptions.ApplicationGenericsException;
import com.pedidosapp.api.service.exceptions.enums.EnumUnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {
    @Autowired
    private AuthenticationManager authenticationManager;

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
                throw new ApplicationGenericsException(EnumUnauthorizedException.WRONG_CREDENTIALS);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCause());
            }
        }
    }
}
