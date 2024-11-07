package com.tehnime.backend.services;

import com.tehnime.backend.model.entities.EmailDetails;
import com.tehnime.backend.model.entities.TokenUser;
import com.tehnime.backend.model.entities.User;
import com.tehnime.backend.repositories.TokenUserRepository;
import com.tehnime.backend.repositories.UserRepository;
import com.tehnime.backend.utils.Security;
import com.tehnime.backend.utils.logger.Log;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class TokenServices {

    private final UserRepository userRepository;
    private final TokenUserRepository tokenUserRepository;
    private final Security security = new Security();
    private final EmailService emailService;

    @Log
    public boolean forgotPwd(String email) {
        User user = userRepository.findUserByEmailHash(security.hash(email));

        if(user != null){
            long tokenGenerated = new Random().nextLong(900000) + 100000;

            TokenUser tokenUser = TokenUser.builder()
                    .tokenResetPwd(Long.toString(tokenGenerated))
                    .user(user)
                    .expirationToken(LocalDateTime.now())
            .build();
            tokenUserRepository.save(tokenUser);

            EmailDetails emailDetails = EmailDetails.builder()
                    .subject("Password reset request for Tehnime account")
                    .recipient(email)
                    .msgBody(generateHtmlEmail(tokenUser.getTokenResetPwd()))
            .build();

            Thread threadMail = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        emailService.sendSimpleMail(emailDetails);
                    } catch (Exception e) {
                        System.out.println("Failed to send email: " + e.getMessage());
                    }
                }
            });

            threadMail.start();
            return true;
        }
        return false;
    }

    @Log
    @Transactional
    @Scheduled(fixedRate = 9000)
    public void deleteTokenExpired(){
        List<TokenUser> tokenUserList = tokenUserRepository.findAll();
        for(TokenUser tokenUser : tokenUserList){
            if(tokenUser.getExpirationToken().isBefore(LocalDateTime.now().minusMinutes(5))){
                tokenUserRepository.delete(tokenUser);
            }
        }
    }

    @Log
    public Long tokenExists(String token){
        TokenUser tokenUser = tokenUserRepository.findTokenUserByTokenResetPwd(token);
        return tokenUser.getUser().getId();
    }

    @Log
    public String generateHtmlEmail(String token) {
        return "<html>" +
                "<head>" +
                "<style>" +
                "body {" +
                "    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" +
                "    background-color: #1a1a1a;" +
                "    margin: 0;" +
                "    padding: 0;" +
                "    color: #000000;" +
                "}" +
                ".container {" +
                "    max-width: 600px;" +
                "    margin: 0 auto;" +
                "    padding: 20px;" +
                "    background-color: #f7f7f7;" +
                "    border-radius: 10px;" +
                "    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" +
                "}" +
                ".header {" +
                "    background-color: #1a1a1a;" +
                "    padding: 20px;" +
                "    text-align: center;" +
                "    color: #ffffff;" +
                "    border-radius: 10px 10px 0 0;" +
                "}" +
                ".content {" +
                "    padding: 20px;" +
                "    color: #000000;" +
                "}" +
                ".code {" +
                "    text-align: center;" +
                "    font-size: 24px;" +
                "    padding: 20px 0;" +
                "    background-color: #ffffff;" +
                "    color: #000000;" +
                "    border-radius: 5px;" +
                "    border: 1px solid #1a1a1a;" +
                "    font-weight: bold;" +
                "}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h2 style='margin: 0;'>Tehnime Streaming Service</h2>" +
                "</div>" +
                "<div class='content'>" +
                "<p>Hello,</p>" +
                "<p>You recently requested to reset your password for your Tehnime account. Use the following code to reset your password:</p>" +
                "<div class='code'>" + token + "</div>" +
                "<p style='color: #999999;'><em>This code is valid for 5 minutes.</em></p><br/>" +
                "<p>If you didn't make this request, you can safely ignore this email.</p>" +
                "<p>Thanks,<br/>The Tehnime Team</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
