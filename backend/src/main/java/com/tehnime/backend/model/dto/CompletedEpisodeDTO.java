package com.tehnime.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompletedEpisodeDTO {
    private Long userId;
    private String episodeId;
}
