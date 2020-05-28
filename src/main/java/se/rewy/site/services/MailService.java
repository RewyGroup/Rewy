package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import se.rewy.site.config.HtmlTemplateConfig;


import javax.mail.*;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class MailService {

    private String baseUrl;


    private final JavaMailSender mailSender;
    private TemplateEngine templateEngine = new HtmlTemplateConfig().HtmlTemplate();


    @Autowired
    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String toEmail, String content, String subject) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        helper.setFrom("Rewy <noreply@rewy.se>");
        helper.setTo(toEmail);
        helper.setText(content, true);
        helper.setSubject(subject);


        mailSender.send(message);
    }


    public void sendRegisterEmail(String toEmail) throws MessagingException {

        String content = templateEngine.process("registerEmail",new Context());
        String subject = "Welcome to Rewy!";
        sendEmail(toEmail,content,subject);

    }
}