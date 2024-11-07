package com.tehnime.backend.controllers;

import com.tehnime.backend.model.api_objects.description.Description;
import com.tehnime.backend.model.api_objects.landing.Landing;
import com.tehnime.backend.services.DescriptionPageServiceImpl;
import com.tehnime.backend.services.LandingPageServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/data")
@CrossOrigin("http://localhost:3000/")
public class ApiObjectsController {
    private final LandingPageServiceImpl landingPage;
    private final DescriptionPageServiceImpl descriptionPage;

    @Operation(summary = "Get all data related to the landing page.")
    @GetMapping("/landing")
    public ResponseEntity<Landing> getLandingPage() {
        return ResponseEntity.ok().body(landingPage.fetchLandingPage());
    }

    @Operation(summary = "Get all data related to the description page.")
    @GetMapping("/description/{animeId}")
    public ResponseEntity<Description> getDescriptionPage(@PathVariable String animeId) {
        return ResponseEntity.ok().body(descriptionPage.fetchDescription(animeId));
    }
}
