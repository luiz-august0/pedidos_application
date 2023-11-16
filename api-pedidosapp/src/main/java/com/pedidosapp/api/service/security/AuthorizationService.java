package com.pedidosapp.api.service.security;

import com.pedidosapp.api.repository.UsuarioRepository;
import com.pedidosapp.api.service.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {
    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        try {
            return repository.findByLogin(username);
        } catch (UsernameNotFoundException e) {
            throw new ResourceNotFoundException();
        }
    }
}
