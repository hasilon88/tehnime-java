package com.tehnime.backend.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModifyDetailsDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
}
