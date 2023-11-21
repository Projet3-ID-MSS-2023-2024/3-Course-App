package com.example.courseapp.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(String to, String subjet, String htmlContent) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subjet);
        helper.setText(htmlContent);
        //helper.setText(htmlContent, true);  -> a utiliser pour envoyer des template en html
        javaMailSender.send(message);
    }

}
