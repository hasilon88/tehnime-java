package com.tehnime.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryDTO {
    private Long userId;
    private String episodeId;
    private Float resumeTime;
    private String image;
}
