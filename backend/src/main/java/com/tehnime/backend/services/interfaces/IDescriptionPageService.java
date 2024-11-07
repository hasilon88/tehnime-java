package com.tehnime.backend.services.interfaces;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tehnime.backend.model.api_objects.description.Description;
import org.springframework.web.client.RestTemplate;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public interface IDescriptionPageService {
    ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    RestTemplate restTemplate = new RestTemplate();
    Properties constants = new Properties(){{
        try {
            load(new FileInputStream("src/main/java/com/tehnime/backend/model/data/constants.properties"));
        } catch (IOException e) {
            System.out.println("Failed to load constants properties file");
        }
    }};

    /**
     * Method to fetch all the data from the gogoAnime API related to a specific anime.
     * @param animeId
     * @return JsonNode
     */
    public JsonNode fetchDataFromGogo(String animeId);

    /**
     * Method to fetch all the data from the kitsu API related to a specific anime.
     * @param animeId
     * @param kitsuJsonList
     * @return JsonNode
     */
    public JsonNode fetchDataFromKitsu(String animeId, int kitsuJsonList);

    /**
     * Method to map all relevant to data to the relevant fields in Description.
     * @param gogoData
     * @param kitsuData
     * @return Description
     */
    public Description buildDescription(JsonNode gogoData, JsonNode kitsuData);

    /**
     * Method to get all description related data to anime.
     * @param animeId
     * @return
     */
    public Description fetchDescription(String animeId);
}
