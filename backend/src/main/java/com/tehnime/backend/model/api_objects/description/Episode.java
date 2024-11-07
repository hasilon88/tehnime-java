package com.tehnime.backend.model.api_objects.description;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Episode {
    private String id;
    private Integer episodeNumber;
    private String url;
}
