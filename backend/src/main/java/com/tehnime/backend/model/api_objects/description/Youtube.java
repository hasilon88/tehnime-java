package com.tehnime.backend.model.api_objects.description;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Youtube {
    private String id;
    private String video;
    private String image;
}
