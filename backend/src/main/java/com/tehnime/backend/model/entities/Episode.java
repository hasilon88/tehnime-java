package com.tehnime.backend.model.entities;

import com.tehnime.backend.utils.logger.Log;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Episode implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String episodeId;
    private Float resumeTime;
    private String image;
    private Boolean completed;

    @Override
    @Log
    public boolean equals(Object episode) {
        if (episode == null || getClass() != episode.getClass()) return false;

        Episode newEpisode = (Episode) episode;
        return Objects.equals(episodeId, newEpisode.episodeId);
    }
}
