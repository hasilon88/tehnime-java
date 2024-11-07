package com.tehnime.backend.services;

import com.tehnime.backend.model.dto.CompletedEpisodeDTO;
import com.tehnime.backend.model.dto.HistoryDTO;
import com.tehnime.backend.model.dto.user.*;
import com.tehnime.backend.model.dto.WatchlistDTO;
import com.tehnime.backend.model.entities.Anime;
import com.tehnime.backend.model.entities.Episode;
import com.tehnime.backend.model.entities.User;
import com.tehnime.backend.repositories.AnimeRepository;
import com.tehnime.backend.repositories.EpisodeRepository;
import com.tehnime.backend.repositories.UserRepository;
import com.tehnime.backend.services.interfaces.IUserService;
import com.tehnime.backend.utils.Security;
import com.tehnime.backend.utils.logger.Log;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final UserRepository userRepository;
    private final EpisodeRepository episodeRepository;
    private final AnimeRepository animeRepository;

    private final Security security = new Security();

    @Override
    @Log
    public User getUser(LoginDTO loginDTO) {
        User user = userRepository.findUserByEmailHash(security.hash(loginDTO.getEmail()));

        if (user != null && security.verifyTextToHash(loginDTO.getPassword(), user.getPassword())) {
            user.setEmailEncrypted(loginDTO.getEmail());
            user.setEmailHash(null);
            user.setPassword(null);
            return user;
        }

        return null;
    }

    @Override
    @Log
    public Long createUser(SignUpDTO signUpDTO) {
        String passwordHash = security.hashWithSalt(signUpDTO.getPassword());
        User user =
                User.builder()
                    .firstName(signUpDTO.getFirstName())
                    .lastName(signUpDTO.getLastName())
                    .password(passwordHash)
                    .emailHash(security.hash(signUpDTO.getEmail()))
                    .emailEncrypted(security.encrypt(signUpDTO.getEmail(), passwordHash))
                .build();

        return userRepository.save(user).getId();
    }

    @Override
    @Log
    public Boolean modifyUserDetails(ModifyDetailsDTO modifyDetailsDTO) {
        User user = userRepository.findUserById(modifyDetailsDTO.getUserId());
        boolean isModified = false;

        if (!modifyDetailsDTO.getFirstName().equals(user.getFirstName())) {
            user.setFirstName(modifyDetailsDTO.getFirstName());
            isModified = true;
        }

        if (!modifyDetailsDTO.getLastName().equals(user.getLastName())) {
            user.setLastName(modifyDetailsDTO.getLastName());
            isModified = true;
        }

        String newEmailHash = security.hash(modifyDetailsDTO.getEmail());
        if (!newEmailHash.equals(user.getEmailHash())) {
            user.setEmailHash(newEmailHash);
            user.setEmailEncrypted(security.encrypt(modifyDetailsDTO.getEmail(), user.getPassword()));
            isModified = true;
        }

        if (isModified)
            userRepository.save(user);

        return isModified;
    }

    @Override
    @Log
    public Boolean changeUserPassword(ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findUserById(changePasswordDTO.getUserId());

        String oldPasswordHash = user.getPassword();
        String email = security.decrypt(user.getEmailEncrypted(), user.getPassword());

        user.setPassword(security.hashWithSalt(changePasswordDTO.getNewPassword()));
        user.setEmailEncrypted(security.encrypt(email, user.getPassword()));

        user = userRepository.save(user);

        return !security.verifyHashToHash(oldPasswordHash, user.getPassword());
    }
    @Override
    @Log
    public Boolean resetUserPassword(ResetPwdDTO resetPwdDTO) {
        User user = userRepository.findUserById(resetPwdDTO.getUserId());

        String oldPasswordHash = user.getPassword();
        String email = security.decrypt(user.getEmailEncrypted(), user.getPassword());

        user.setPassword(security.hashWithSalt(resetPwdDTO.getNewPwd()));
        user.setEmailEncrypted(security.encrypt(email, user.getPassword()));

        user = userRepository.save(user);

        return !security.verifyHashToHash(oldPasswordHash, user.getPassword());
    }

    @Override
    @Log
    public List<Anime> getUserWatchlist(Long userId) {
        return userRepository.findUserById(userId).getWatchlist();
    }

    @Override
    @Log
    public Boolean addAnimeToWatchlist(WatchlistDTO watchlistDTO) {
        User user = userRepository.findUserById(watchlistDTO.getUserId());

        if (user.getWatchlist().contains(animeRepository.findAnimeByAnimeId(watchlistDTO.getAnimeId())))
            return false;

        Anime anime = animeRepository.save(
                Anime.builder()
                        .animeId(watchlistDTO.getAnimeId())
                        .image(watchlistDTO.getImage())
                        .build()
        );

        user.getWatchlist().add(anime);

        return userRepository.save(user).getWatchlist().contains(anime);
    }

    @Override
    @Log
    public Boolean deleteAnimeFromWatchlist(WatchlistDTO watchlistDTO) {
        User user = userRepository.findUserById(watchlistDTO.getUserId());

        for (Anime currentAnime : user.getWatchlist()) {
            if (currentAnime.getAnimeId().equals(watchlistDTO.getAnimeId())) {
                user.getWatchlist().remove(currentAnime);
                animeRepository.delete(currentAnime);
                break;
            }
        }



        return !(userRepository.save(user).getWatchlist().contains(Anime.builder()
                .animeId(watchlistDTO.getAnimeId())
                .build()));
    }

    @Override
    @Log
    public List<Episode> getUserHistory(Long userId) {
        return userRepository.findUserById(userId).getHistory();
    }

    @Override
    @Log
    public Boolean addEpisodeToHistory(HistoryDTO historyDTO) {
        Episode episode =
                Episode.builder()
                        .episodeId(historyDTO.getEpisodeId())
                        .resumeTime(historyDTO.getResumeTime())
                        .image(historyDTO.getImage())
                        .completed(false)
                .build();

        User user = userRepository.findUserById(historyDTO.getUserId());

        if (user.getHistory().contains(episode)) {

            for (int i = 0; i < user.getHistory().size(); i++) {
                if (user.getHistory().get(i).getEpisodeId().equals(historyDTO.getEpisodeId())) {
                    episodeRepository.delete(user.getHistory().remove(i));
                    break;
                }
            }
            user.getHistory().remove(episode);
        }

        episodeRepository.save(episode);
        user.getHistory().add(episode);

        return userRepository.save(user).getHistory().contains(episode);
    }

    @Log
    public Boolean markEpisodeAsComplete(CompletedEpisodeDTO completedEpisodeDTO) {
        User user = userRepository.findUserById(completedEpisodeDTO.getUserId());

        for (Episode currentEpisode : user.getHistory()) {
            if (currentEpisode.getEpisodeId().equals(completedEpisodeDTO.getEpisodeId())) {
                currentEpisode.setCompleted(true);
                currentEpisode.setResumeTime(0f);
                break;
            }
        }

        userRepository.save(user);

        return true;
    }
}