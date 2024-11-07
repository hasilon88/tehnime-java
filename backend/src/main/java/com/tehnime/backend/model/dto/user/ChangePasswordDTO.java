package com.tehnime.backend.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordDTO {
    private Long userId;
    private String email;
    private String oldPassword;
    private String newPassword;
}
