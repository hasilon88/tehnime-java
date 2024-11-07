package com.tehnime.backend.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPwdDTO {
    private Long userId;
    private String newPwd;
}
