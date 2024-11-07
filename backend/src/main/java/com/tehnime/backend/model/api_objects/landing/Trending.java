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
public class Trending extends Anime {
    private String description;
    private Integer rank;
    private Integer episodeCount;
    private String imagePoster;
    private String imageCover;
}