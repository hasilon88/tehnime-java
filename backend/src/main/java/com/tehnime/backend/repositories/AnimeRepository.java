package com.tehnime.backend.repositories;

import com.tehnime.backend.model.entities.Anime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimeRepository extends JpaRepository<Anime, Long> {
    Anime findAnimeByAnimeId(String animeId);
}
