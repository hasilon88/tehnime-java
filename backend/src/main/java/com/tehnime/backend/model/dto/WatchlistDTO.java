package com.tehnime.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchlistDTO {
    private Long userId;
    private String animeId;
    private String image;
}
