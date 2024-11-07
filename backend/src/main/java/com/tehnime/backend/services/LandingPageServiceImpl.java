package com.tehnime.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.tehnime.backend.model.api_objects.landing.*;
import com.tehnime.backend.services.interfaces.ILandingPageService;
import com.tehnime.backend.utils.logger.Log;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LandingPageServiceImpl implements ILandingPageService{
    @Override
    @Log
    public <T> List<T> fetchAndBuildClass(String url, Class<T> classReference) {
        JsonNode responseNode = restTemplate.getForObject(url, JsonNode.class);

        JsonNode resultsNode = responseNode.isArray() ? responseNode : responseNode.get("results");

        List<T> mappedResults = new ArrayList<>();
        for (JsonNode resultNode : resultsNode) {
            try {
                mappedResults.add(objectMapper.treeToValue(resultNode, classReference));
            } catch (JsonProcessingException e) {
                System.out.println("JsonProcessingException: Error in LandingPageServiceImpl, in method fetchAndBuildClass");
            }
        }
        return mappedResults;
    }

    @Override
    @Log
    public List<Trending> fetchTrending() {
        List<Trending> trendingAnimes = new ArrayList<>();
        JsonNode rootNode = restTemplate.getForObject(
                constants.getProperty("URL-trending"),
                JsonNode.class
        );

        for (JsonNode animeNode : rootNode.get("data")) {
            JsonNode attributes = animeNode.get("attributes");

            try {
                trendingAnimes.add(Trending.builder()
                        .description(attributes.has("synopsis") ? attributes.get("synopsis").asText().replace("\n", "") : null)
                        .id(animeNode.has("id") ? animeNode.get("id").asText() : null)
                        .title(attributes.path("titles").has("en") ? attributes.get("titles").get("en").asText() : null)
                        .rank(attributes.has("ratingRank") ? attributes.get("ratingRank").asInt() : 0)
                        .episodeCount(attributes.has("episodeCount") ? attributes.get("episodeCount").asInt() : 0)
                        .imagePoster(attributes.path("posterImage").has("original") ? attributes.get("posterImage").get("original").asText() : null)
                        .imageCover(attributes.path("coverImage").has("original") ? attributes.get("coverImage").get("original").asText() : null)
                .build()

                );
            } catch (Exception e) {
            }
        }
        return trendingAnimes;
    }

    @Override
    @Log
    public List<TopAiring> fetchTopAiring() {
        return fetchAndBuildClass(
                constants.getProperty("URL-gogo_domain") + constants.getProperty("URL-top-airing"),
                TopAiring.class
        );
    }

    @Override
    @Log
    public List<Popular> fetchPopular() {
        return fetchAndBuildClass(
                constants.getProperty("URL-gogo_domain") + constants.getProperty("URL-popular"),
                Popular.class
        );
    }

    @Override
    @Log
    public List<Recent> fetchRecent() {
        return fetchAndBuildClass(
                constants.getProperty("URL-gogo_domain") + constants.getProperty("URL-recent"),
                Recent.class
        );
    }

    @Override
    @Log
    public List<Category> fetchCategories() {
        return fetchAndBuildClass(
                constants.getProperty("URL-gogo_domain") + constants.getProperty("URL-categories"),
                Category.class
        );
    }

    @Override
    @Log
    public Landing createThreads(Landing landing) {
        Thread threadTrending = new Thread(new Runnable() {
            @Override
            public void run() {
                landing.setTrending(fetchTrending());
            }
        });

        Thread threadTopAiring = new Thread(new Runnable() {
            @Override
            public void run() {
                landing.setTopAiring(fetchTopAiring());
            }
        });

        Thread threadPopular = new Thread(new Runnable() {
            @Override
            public void run() {
                landing.setPopular(fetchPopular());
            }
        });

        Thread threadRecent = new Thread(new Runnable() {
            @Override
            public void run() {
                landing.setRecent(fetchRecent());
            }
        });

        Thread threadCategories = new Thread(new Runnable() {
            @Override
            public void run() {
                landing.setCategories(fetchCategories());
            }
        });

        threadTrending.start();
        threadTopAiring.start();
        threadPopular.start();
        threadRecent.start();
        threadCategories.start();

        try {
            threadTrending.join();
            threadTopAiring.join();
            threadPopular.join();
            threadRecent.join();
            threadCategories.join();
        } catch (Exception e) {
            Thread.currentThread().interrupt();
        }

        return landing;
    }

    @Override
    @Log
    public Landing fetchLandingPage() {
        return createThreads(new Landing());
    }
}