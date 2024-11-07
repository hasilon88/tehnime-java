package com.tehnime.backend.controllers;

import com.tehnime.backend.model.dto.CompletedEpisodeDTO;
import com.tehnime.backend.model.dto.HistoryDTO;
import com.tehnime.backend.model.dto.user.*;
import com.tehnime.backend.model.dto.WatchlistDTO;
import com.tehnime.backend.model.entities.Anime;
import com.tehnime.backend.model.entities.Episode;
import com.tehnime.backend.model.entities.TokenUser;
import com.tehnime.backend.model.entities.User;
import com.tehnime.backend.repositories.UserRepository;
import com.tehnime.backend.services.TokenServices;
import com.tehnime.backend.utils.Response;
import com.tehnime.backend.utils.Security;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import com.tehnime.backend.services.UserServiceImpl;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000/")
public class UserController {
    private final UserServiceImpl userServices;
    private final UserRepository userRepository;
    private final TokenServices tokenServices;

    private final Security security = new Security();

    @Operation(summary = "This endpoint creates a user.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User created successfully",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = Response.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Email address is already in use.",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = Response.class
                            ))
                    }
            )
    })
    @PostMapping("/sign-up")
    public ResponseEntity<Response<Long>> userCreation(@RequestBody SignUpDTO signUpDTO) {
        if (userRepository.existsByEmailHash(security.hash(signUpDTO.getEmail())))
            return ResponseEntity.badRequest().body(
                    Response.<Long>builder()
                            .details("Error: Email address is already in use.")
                            .value(-1L)
                            .build()
            );

        else
            return ResponseEntity.ok().body(
                    Response.<Long>builder()
                            .details("User successfully created.")
                            .value(userServices.createUser(signUpDTO))
                            .build()
            );
    }

    @Operation(summary = "This endpoint logs in a user.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User logged in successfully",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = Response.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Email address or password incorrect"
            )
    })
    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDTO loginDTO){
        User user = userServices.getUser(loginDTO);

        if (user == null)
            return new ResponseEntity<>(HttpStatus.valueOf(401));

        else {
            //tokenServices.forgotPwd(loginDTO.getEmail());

            user.setPassword(null);
            return ResponseEntity.ok().body(
                    Response.<User>builder()
                            .details("User successfully logged in.")
                            .value(user)
                            .build()
            );
        }
    }
    @Operation(summary = "This endpoint modifies details of a user.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User modified successfully",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = Response.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "User does not exist"
            )
    })
    @PostMapping("/modify")
    public ResponseEntity<?> userModifyDetails(@RequestBody ModifyDetailsDTO modifyDetailsDTO){
        if (!userRepository.existsById(modifyDetailsDTO.getUserId())){
            return new ResponseEntity<>(HttpStatus.valueOf(404));
        }

        return ResponseEntity.ok().body(
                Response.<Boolean>builder()
                        .details("User details modified")
                        .value(userServices.modifyUserDetails(modifyDetailsDTO))
                        .build()
        );
    }

    @Operation(summary = "This endpoint changes a user's password.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User password changed successfully",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = Response.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Password incorrect"
            )
    })

    @PatchMapping("/change-pwd")
    public ResponseEntity<?> userModifyPassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        if (!security.verifyTextToHash(changePasswordDTO.getOldPassword(), userRepository.findUserById(changePasswordDTO.getUserId()).getPassword()))
            return new ResponseEntity<>(HttpStatus.valueOf(401));

        return ResponseEntity.ok().body(
                Response.<Boolean>builder()
                        .details("User password modified.")
                        .value(userServices.changeUserPassword(changePasswordDTO))
                        .build()
        );
    }

    @PatchMapping("/reset-pwd")
    public ResponseEntity<?> userResetPassword(@RequestBody ResetPwdDTO resetPwdDTO) {
        User user = userRepository.findUserById(resetPwdDTO.getUserId());
        if(user==null)
            return new ResponseEntity<>(HttpStatus.valueOf(401));

        return ResponseEntity.ok().body(
                Response.<Boolean>builder()
                        .details("User password modified.")
                        .value(userServices.resetUserPassword(resetPwdDTO))
                        .build()
        );
    }

    @PatchMapping("/verification-token")
    public ResponseEntity<?> isTokenExists(@RequestParam String token){
        Long userId = tokenServices.tokenExists(token);
        if(userId==null){
            new ResponseEntity<>(HttpStatus.valueOf(401));
        }
        return ResponseEntity.ok().body(
                Response.builder()
                        .details("Token Exists")
                        .value(userId)
                        .build()
        );
    }

    @PatchMapping("/forgot-pwd")
    public ResponseEntity<?> userForgotPwd(@RequestParam String email){
        if( tokenServices.forgotPwd(email)){
            return ResponseEntity.ok().body(
                    Response.builder()
                            .details("Token created")
                            .value(true)
                            .build()
            );
        }
        else
            return new ResponseEntity<>(HttpStatus.valueOf(401));
    }

    @Operation(summary = "This endpoint gets a users watchList.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Watchlist found and watchlist not empty",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = Response.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "Watchlist empty"
            )
    })
    @GetMapping("/watchlist")
    public ResponseEntity<?> userWatchList(@RequestParam Long userId){
        List<Anime> watchlist = userServices.getUserWatchlist(userId);

        if (!watchlist.isEmpty())
            return ResponseEntity.ok().body(
                    Response.<List<Anime>>builder()
                            .details("Watchlist found and not empty")
                            .value(watchlist)
                            .build()
            );
        else
            return new ResponseEntity<>(HttpStatus.valueOf(204));
    }

    @Operation(summary = "This endpoint gets users history.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "History found and history not empty",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = Response.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "History empty"
            )
    })
    @GetMapping("/history")
    public ResponseEntity<?> userHistory(@RequestParam Long userId){
        List<Episode> history = userServices.getUserHistory(userId);

        if (!history.isEmpty())
            return ResponseEntity.ok().body(
                    Response.<List<Episode>>builder()
                            .details("History found and not empty")
                            .value(history)
                            .build()
            );
        else
            return new ResponseEntity<>(HttpStatus.valueOf(204));
    }

    @Operation(summary = "This endpoint deletes an episode from a user's history")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Episode deleted successfully",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = ResponseEntity.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "509",
                    description = "Episode does not exist"
            )
    })
    @PostMapping("mark-as-completed-episode")
    public ResponseEntity<Boolean> deleteEpisodeFromHistory(@RequestBody CompletedEpisodeDTO completedEpisodeDTO){
        return userServices.markEpisodeAsComplete(completedEpisodeDTO)? new ResponseEntity<>(HttpStatus.valueOf(200)): new ResponseEntity<>(HttpStatus.valueOf(509));
    }

    @Operation(summary = "This endpoint adds a anime to the users watchlist.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Anime added to watchlist",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = ResponseEntity.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Server error, anime not added to watchlist"
            )
    })
    @PostMapping("/add-anime")
    public ResponseEntity<Integer> addAnime(@RequestBody WatchlistDTO watchlistDTO){
        return userServices.addAnimeToWatchlist(watchlistDTO) ? new ResponseEntity<>(HttpStatus.valueOf(200)) : new ResponseEntity<>(HttpStatus.valueOf(500));
    }

    @Operation(summary = "This endpoint adds a episode to users history.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Episode added to history",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = ResponseEntity.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Server error, episode not added to history"
            )
    })
    @PostMapping("/add-episode")
    public ResponseEntity<Integer> addEpisode(@RequestBody HistoryDTO historyDTO){
        return userServices.addEpisodeToHistory(historyDTO) ? new ResponseEntity<>(HttpStatus.valueOf(200)) : new ResponseEntity<>(HttpStatus.valueOf(500));
    }

    @Operation(summary = "This endpoint deletes an anime from a user's watchlist")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Anime deleted successfully",
                    content = {
                            @Content(mediaType = "application/json", schema = @Schema(
                                    implementation = ResponseEntity.class
                            ))
                    }
            ),
            @ApiResponse(
                    responseCode = "509",
                    description = "Anime does not exist"
            )
    })
    @DeleteMapping("delete-anime")
    public ResponseEntity<Boolean> deleteAnime(@RequestBody WatchlistDTO watchlistDTO){
        return userServices.deleteAnimeFromWatchlist(watchlistDTO)? new ResponseEntity<>(HttpStatus.valueOf(200)): new ResponseEntity<>(HttpStatus.valueOf(509));
    }
}
