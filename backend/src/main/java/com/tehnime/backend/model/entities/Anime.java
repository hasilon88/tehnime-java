package com.tehnime.backend.model.entities;

import com.tehnime.backend.utils.logger.Log;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Anime implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String animeId;
    private String image;

    @Override
    @Log
    public boolean equals(Object anime) {
        if (anime == null || getClass() != anime.getClass()) return false;

        Anime newAnime = (Anime) anime;
        return Objects.equals(animeId, newAnime.animeId);
    }
}