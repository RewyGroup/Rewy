package se.rewy.site.config;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

/**
 * This class sets the configurations for the mail that is sent out by the server once the user
 * registers or receives a story. (The page that is sent out by the mail server is a html page
 * therefore it has to be configured beforehand.
 */
public class HtmlTemplateConfig {
    public TemplateEngine HtmlTemplate() {
        TemplateEngine templateEngine = new TemplateEngine();
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding("UTF-8");

        templateEngine.setTemplateResolver(templateResolver);
        return templateEngine;
    }
}