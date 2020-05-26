package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import javax.mail.*;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;


/**
 * Sets email content as specified in template and sends it to the socent. If template is for
 * welcome email the content is dynamically getting token from database. If template is for story
 * email the content is static but with attachment of a story as PDF. When email is sent, the PDF is
 * deleted.
 */
@Service
public class MailService {

    private String baseUrl;


    private final JavaMailSender mailSender;


    @Autowired
    public MailService(

            JavaMailSender mailSender) {

        this.mailSender = mailSender;
    }

    public void sendEmail()
            throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        helper.setFrom("Rewy <grouprewy@gmail.com>");
        helper.setTo("johnnyhoaang@gmail.com");
        helper.setText("Test text", true);
        helper.setSubject("Test title");


        mailSender.send(message);
    }
}