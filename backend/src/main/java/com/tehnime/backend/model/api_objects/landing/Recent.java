package com.tehnime.backend.model.api_objects.landing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Recent extends Anime {
    private String episodeId;
    private Integer episodeNumber;
}
