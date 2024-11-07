package com.tehnime.backend.repositories;

import com.tehnime.backend.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmailHash (String emailHash);
    boolean existsByEmailHash(String emailHash);
    User findUserById(Long id);
}