package com.tehnime.backend.model.dto.user;

import lombok.Data;

@Data
public class LoginDTO {
    private String email;
    private String password;
}
