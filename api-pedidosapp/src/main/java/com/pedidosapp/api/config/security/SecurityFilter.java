package com.pedidosapp.api.config.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.pedidosapp.api.repository.UserRepository;
import com.pedidosapp.api.service.exceptions.enums.EnumGenericsException;
import com.pedidosapp.api.service.security.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    private String recoverToken(HttpServletRequest request) {
        var sessionHeader = request.getHeader("Authorization");
        if (sessionHeader == null) return null;
        return sessionHeader.replace("Bearer ", "");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = recoverToken(request);
        try {
            if (token != null) {
                var login = tokenService.validateToken(token);
                UserDetails userDetails = userRepository.findByLogin(login);

                var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            String errorMessage;

            if (e.getClass().equals(TokenExpiredException.class)) {
                errorMessage = EnumGenericsException.EXPIRED_TOKEN.getMessage();
            } else if (e.getClass().equals(JWTVerificationException.class)) {
                errorMessage = EnumGenericsException.VALIDATE_TOKEN.getMessage();
            } else {
                errorMessage = e.getMessage();
            }

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\":\"" + errorMessage + "\"}");
        }
    }
}
