package com.tehnime.backend.services.interfaces;

import com.tehnime.backend.model.dto.HistoryDTO;
import com.tehnime.backend.model.dto.user.*;
import com.tehnime.backend.model.dto.WatchlistDTO;
import com.tehnime.backend.model.entities.Anime;
import com.tehnime.backend.model.entities.Episode;
import com.tehnime.backend.model.entities.User;

import java.util.List;

public interface IUserService {
    /**
     * Method to get a user from his email and password.
     * @param loginDTO
     * @return User
     */
    public User getUser(LoginDTO loginDTO);

    /**
     * Method to create a User from a SignUpDTO.
     * @param signUpDTO
     * @return The Users Id
     */
    public Long createUser(SignUpDTO signUpDTO);

    /**
     * Method to modify the base details of the user.
     * This method should update the previous user's information.
     * @param modifyDetailsDTO
     * @return
     */
    public Boolean modifyUserDetails(ModifyDetailsDTO modifyDetailsDTO);

    /**
     * Method to change a User's password.
     * @param changePasswordDTO
     * @return
     */
    public Boolean changeUserPassword(ChangePasswordDTO changePasswordDTO);

    /**
     * Method to get a users watchlist from his Id.
     * @param userId
     * @return The Users Watchlist
     */
    public List<Anime> getUserWatchlist(Long userId);

    /**
     * Method to add a anime to a Users Watchlist.
     * @param watchlistDTO
     * @return Outcome of Adding the Anime to the Watchlist: Success or Failure
     */
    public Boolean addAnimeToWatchlist(WatchlistDTO watchlistDTO);

    /**
     * Method to delete a anime from a User's Watchlist.
     * @param watchlistDTO
     * @return
     */
    public Boolean deleteAnimeFromWatchlist(WatchlistDTO watchlistDTO);

    /**
     * Method to get a users history from his Id.
     * @param userID
     * @return The Users Watchlist
     */
    public List<Episode> getUserHistory(Long userID);

    /**
     * Method to add a episode to a Users History.
     * If a episode is already present in the Users history, it overrides the existing Episode.
     * @param historyDTO
     * @return Outcome of adding the Episode to the History: Success or Failure
     */
    public Boolean addEpisodeToHistory(HistoryDTO historyDTO);

    /**
     * Resets a user's password based on the provided reset password information.
     *
     * @param resetPwdDTO The data transfer object containing necessary information for password reset.
     * @return A boolean indicating the outcome of the operation: true if the password reset was
     *         successful, and false otherwise.
     */
    public Boolean resetUserPassword(ResetPwdDTO resetPwdDTO);
}
