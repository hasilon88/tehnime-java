package com.tehnime.backend.services;
import com.tehnime.backend.model.entities.EmailDetails;
import com.tehnime.backend.utils.logger.Log;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    @Log
    public void sendSimpleMail(EmailDetails emailDetails) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(sender);
            helper.setTo(emailDetails.getRecipient());
            helper.setSubject(emailDetails.getSubject());
            helper.setText(emailDetails.getMsgBody(), true);

            javaMailSender.send(message);
            System.out.println("Mail Sent Successfully...");
        } catch (MessagingException e) {
            System.out.println("Error while Sending Mail: " + e.getMessage());
        }
    }

}
