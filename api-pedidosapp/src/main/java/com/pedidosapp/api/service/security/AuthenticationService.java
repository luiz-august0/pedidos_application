package com.pedidosapp.api.service.security;

import com.pedidosapp.api.model.dtos.AuthenticationDTO;
import com.pedidosapp.api.model.dtos.LoginResponseDTO;
import com.pedidosapp.api.model.dtos.RegisterDTO;
import com.pedidosapp.api.model.dtos.UsuarioDTO;
import com.pedidosapp.api.model.entities.Usuario;
import com.pedidosapp.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
    private UsuarioRepository repository;

    @Autowired
    private TokenService tokenService;

    public ResponseEntity login(AuthenticationDTO authenticationDTO) {
        var loginSenha = new UsernamePasswordAuthenticationToken(authenticationDTO.login(), authenticationDTO.senha());
        var session = authenticationManager.authenticate(loginSenha);
        var token = tokenService.geraToken((UsuarioDTO) session.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    public ResponseEntity registrar(RegisterDTO registerDTO) {
        if(repository.findByLogin(registerDTO.login()) != null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário já cadastrado");

        String senhaIncriptada = new BCryptPasswordEncoder().encode(registerDTO.senha());
        Usuario usuario = new Usuario(registerDTO.login(), senhaIncriptada, registerDTO.role());
        repository.save(usuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(usuario);
    }
}
