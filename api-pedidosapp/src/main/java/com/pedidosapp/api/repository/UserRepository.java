package com.pedidosapp.api.repository;

import com.pedidosapp.api.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends
        JpaRepository<User, Integer>,
        PagingAndSortingRepository<User, Integer>,
        JpaSpecificationExecutor<User>
{
    UserDetails findByLogin(String login);
}
