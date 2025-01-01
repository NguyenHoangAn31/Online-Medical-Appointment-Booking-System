package vn.aptech.backendapi.config;

import java.util.Properties;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import vn.aptech.backendapi.jwt.JWT;
import vn.aptech.backendapi.jwt.JWTImpl;

@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {
    
    @Value("${spring.mail.host}")
    private String mailHost;
    @Value("${spring.mail.port}")
    private String mailPort;
    @Value("${spring.mail.username}")
    private String mailUsername;
    @Value("${spring.mail.password}")
    private String mailPassword;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(mailHost);
        javaMailSender.setPort(Integer.parseInt(mailPort));
        javaMailSender.setUsername(mailUsername);
        javaMailSender.setPassword(mailPassword);

        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.smtp.starttls.enable", "true");
        return javaMailSender;
    }

    // @Override
    // public void addResourceHandlers(ResourceHandlerRegistry registry) {
    //     String staticFolder = "file:///" + System.getProperty("user.dir") +
    //             "/src/main/resources/static/images/";
    //     registry.addResourceHandler("/images/**").addResourceLocations(staticFolder);
    //     WebMvcConfigurer.super.addResourceHandlers(registry);
    // }
    @Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    String staticFolder = "file:/app/resources/static/images/";  // Đường dẫn bên trong container Docker
    registry.addResourceHandler("/images/**").addResourceLocations(staticFolder);
    WebMvcConfigurer.super.addResourceHandlers(registry);
}


    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setFieldMatchingEnabled(true).setMatchingStrategy(MatchingStrategies.STRICT)
                .setAmbiguityIgnored(false);
        return modelMapper;
    }

    @Bean
    public Jackson2ObjectMapperBuilder objectMapperBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        // Cấu hình objectMapper của bạn tại đây nếu cần thiết
        builder.failOnEmptyBeans(false); // Tắt SerializationFeature.FAIL_ON_EMPTY_BEANS
        return builder;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("*");
    }

    @Bean
    JWT jwt() {
        return new JWTImpl();
    }

}
