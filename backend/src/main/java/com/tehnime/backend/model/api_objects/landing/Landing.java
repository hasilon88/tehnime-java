package com.tehnime.backend.model.api_objects.landing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Landing {
    List<Trending> trending;
    List<TopAiring> topAiring;
    List<Popular> popular;
    List<Recent> recent;
    List<Category> categories;
}
