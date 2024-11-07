package com.tehnime.backend.model.api_objects.description;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Description {
    private String id;
    private Title title;
    private String description;
    private String status;
    private Boolean dub;
    private LocalDate startDate;
    private LocalDate endDate;
    private String rating;
    private String ageRating;
    private Integer currentEpisodeCount;
    private Images images;
    private Youtube youtube;
    private List<Episode> episodes;
}
