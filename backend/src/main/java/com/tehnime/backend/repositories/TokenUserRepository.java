package com.tehnime.backend.repositories;

import com.tehnime.backend.model.entities.TokenUser;
import com.tehnime.backend.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TokenUserRepository extends JpaRepository<TokenUser, Long> {
    TokenUser findTokenUserByTokenResetPwd(String token);

}
