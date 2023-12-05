package com.pedidosapp.api.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pedidosapp.api.model.enums.EnumUserRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
@EqualsAndHashCode(of = "id")
public class User implements UserDetails, Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EnumUserRole role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Employee employee;

    public User(String login, String password, EnumUserRole role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}