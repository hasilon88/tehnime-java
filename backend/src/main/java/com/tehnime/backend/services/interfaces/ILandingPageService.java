package com.tehnime.backend.services.interfaces;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tehnime.backend.model.api_objects.landing.*;
import org.springframework.web.client.RestTemplate;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

public interface ILandingPageService {
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
     * A generic method to fetch data from "https://anime-api-navy.vercel.app/anime/gogoanime/**",
     * map the corresponding Class and create a List of the Class.
     * @param url
     * @param classReference
     * @return List<T>
     */
    public <T> List<T> fetchAndBuildClass(String url, Class<T> classReference);

    /**
     * Method to fetch data from "https://kitsu.io/api/edge/trending/anime",
     * map each object to Trending and create a List of multiple Trending object.
     * @return List<Trending>
     */
    public List<Trending> fetchTrending();

    /**
     * Method to get a List of TopAiring by using the fetchAndBuildClass method.
     * @return List<TopAiring>
     */
    public List<TopAiring> fetchTopAiring();

    /**
     * Method to get a List of Popular by using the fetchAndBuildClass method.
     * @return List<Popular>
     */
    public List<Popular> fetchPopular();

    /**
     * Method to get a List of Recent by using the fetchAndBuildClass method.
     * @return List<Recent>
     */
    public List<Recent> fetchRecent();

    /**
     * Method to get a List of Categories by using the fetchAndBuildClass method.
     * @return List<Categories>
     */
    public List<Category> fetchCategories();

    /**
     * Method to create threads for all the previous methods.
     * @param landing
     * @return landing
     */
    public Landing createThreads(Landing landing);

    /**
     * Method to get all relevant data to the landing page.
     * @return Landing
     */
    public Landing fetchLandingPage();
}
