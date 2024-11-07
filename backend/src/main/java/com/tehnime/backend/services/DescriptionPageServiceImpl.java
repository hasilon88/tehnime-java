package com.tehnime.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.tehnime.backend.model.api_objects.description.*;
import com.tehnime.backend.services.interfaces.IDescriptionPageService;
import com.tehnime.backend.utils.logger.Log;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class DescriptionPageServiceImpl implements IDescriptionPageService {

    @Override
    @Log
    public JsonNode fetchDataFromGogo(String animeId) {
        return restTemplate.getForObject(
                constants.getProperty("URL-gogo_domain") + constants.getProperty("URL-gogoanime_search") + animeId,
                JsonNode.class
        );
    }

    @Override
    @Log
    public JsonNode fetchDataFromKitsu(String animeId, int kitsuJsonList) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.valueOf("application/vnd.api+json")));

        HttpEntity<String> modifiedHttpRequest = new HttpEntity<>(headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(
                constants.getProperty("URL-kitsu_search") + animeId,
                HttpMethod.GET,
                modifiedHttpRequest,
                JsonNode.class
        );
        return response.getBody().get("data").get(kitsuJsonList).get("attributes");
    }

    @Override
    @Log
    public Description buildDescription(JsonNode gogoData, JsonNode kitsuData) {
        Description descriptionPage = new Description();

        if (gogoData.has("id")) {
            descriptionPage.setId(gogoData.get("id").asText());
        }

        if (gogoData.has("title")) {
            String title = gogoData.get("title").asText();
            String japaneseTitle = kitsuData.path("titles").has("ja_jp") ? kitsuData.path("titles").path("ja_jp").asText() : null;
            descriptionPage.setTitle(new Title(title, japaneseTitle));
        }

        descriptionPage.setDub(gogoData.get("id").asText().contains("dub"));

        if (kitsuData.has("description")) {
            String description = kitsuData.get("description").asText().replace('\n', ' ');
            descriptionPage.setDescription(description);
        }

        if (kitsuData.has("status")) {
            descriptionPage.setStatus(kitsuData.get("status").asText());
        }

        if (kitsuData.has("startDate")) {
            LocalDate startDate = LocalDate.parse(kitsuData.get("startDate").asText());
            descriptionPage.setStartDate(startDate);
        }

        if (kitsuData.has("endDate")) {
            try {
                LocalDate endDate = LocalDate.parse(kitsuData.get("endDate").asText());
                descriptionPage.setEndDate(endDate);
            } catch (Exception e) {
                descriptionPage.setEndDate(LocalDate.now());
            }
        }

        if (kitsuData.has("averageRating")) {
            descriptionPage.setRating(kitsuData.get("averageRating").asText());
        }

        if (kitsuData.has("ageRatingGuide")) {
            descriptionPage.setAgeRating(kitsuData.get("ageRatingGuide").asText());
        }

        try {
            if (gogoData.has("totalEpisodes")) {
                descriptionPage.setCurrentEpisodeCount(gogoData.get("totalEpisodes").asInt());
            }
        } catch (Exception e) {
            descriptionPage.setCurrentEpisodeCount(0);
        }

        String gogoImage = gogoData.has("image") ? gogoData.get("image").asText() : null;
        String posterImage = kitsuData.path("posterImage").has("original") ? kitsuData.path("posterImage").path("original").asText() : null;
        String coverImage = kitsuData.path("coverImage").has("original") ? kitsuData.path("coverImage").path("original").asText() : null;
        descriptionPage.setImages(new Images(gogoImage, posterImage, coverImage));

        String youtubeVideoId = kitsuData.has("youtubeVideoId") ? kitsuData.get("youtubeVideoId").asText() : null;
        String youtubeUrl = youtubeVideoId != null ? "http://youtube.com/watch?v=" + youtubeVideoId : null;
        String youtubeImageUrl = youtubeVideoId != null ? "https://img.youtube.com/vi/" + youtubeVideoId + "/maxresdefault.jpg" : null;
        descriptionPage.setYoutube(new Youtube(youtubeVideoId, youtubeUrl, youtubeImageUrl));

        JsonNode episodesNode = gogoData.get("episodes");
        if (descriptionPage.getCurrentEpisodeCount().equals(0)) {
            descriptionPage.setEpisodes(new ArrayList<>());
        } else {
            List<Episode> episodeList = new ArrayList<>();
            for (JsonNode episodeJson : episodesNode) {
                episodeList.add(
                        Episode.builder()
                                .id(episodeJson.has("id") ? episodeJson.get("id").asText() : null)
                                .episodeNumber(episodeJson.has("number") ? episodeJson.get("number").asInt() : null)
                                .url(episodeJson.has("url") ? episodeJson.get("url").asText() : null)
                                .build()
                );
            }

            descriptionPage.setEpisodes(episodeList);
        }

        return descriptionPage;
    }


    @Override
    @Log
    public Description fetchDescription(String animeId) {
        ObjectNode gogoNode = objectMapper.createObjectNode();
        ObjectNode kitsuNode = objectMapper.createObjectNode();

        Thread gogoThread = new Thread(() ->
                gogoNode.setAll((ObjectNode) fetchDataFromGogo(animeId))
        );

        Thread kitsuThread = new Thread(() ->
                kitsuNode.setAll((ObjectNode) fetchDataFromKitsu(animeId, 0))
        );

        gogoThread.start();
        kitsuThread.start();

        try {
            gogoThread.join();
            kitsuThread.join();
        } catch (Exception ignored) {
        }

        try {
            return buildDescription(gogoNode, kitsuNode);
        } catch (Exception e) {
            kitsuNode.setAll((ObjectNode) fetchDataFromKitsu(animeId, 1));
        }

        return buildDescription(gogoNode, kitsuNode);
    }
}
