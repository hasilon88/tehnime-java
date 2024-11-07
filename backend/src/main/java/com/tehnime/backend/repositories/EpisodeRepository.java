package com.tehnime.backend.repositories;

import com.tehnime.backend.model.entities.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EpisodeRepository extends JpaRepository<Episode, Long>{
}
