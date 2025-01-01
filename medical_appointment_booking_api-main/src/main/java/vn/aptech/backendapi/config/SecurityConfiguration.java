package vn.aptech.backendapi.config;

import jakarta.servlet.DispatcherType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import vn.aptech.backendapi.middle.AuthenticationMiddleware;
import vn.aptech.backendapi.repository.UserRepository;
import vn.aptech.backendapi.service.Auth.AuthenticationService;
import vn.aptech.backendapi.ultils.PublicRoutes;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private AuthenticationMiddleware authenticationMiddleware;
    @Autowired
    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Autowired
    public void globalConfiguration(AuthenticationManagerBuilder authentication) throws Exception {
        authentication.userDetailsService(authenticationService).passwordEncoder(passwordEncoder());
    }
    @Bean
    @Order(1)
    public SecurityFilterChain api(HttpSecurity http) throws Exception {


        PublicRoutes.PublicRoutesManager.publicRoutes().add(HttpMethod.POST, "/api/auth/**", "/paypal/**", "/api/payment/**").injectOn(http);
        PublicRoutes.PublicRoutesManager.publicRoutes().add(HttpMethod.GET, "/api/payment/**","/api/schedules/**" ).injectOn(http);
        http.csrf(AbstractHttpConfigurer::disable).securityMatcher("/api/**")
                .authorizeHttpRequests(request -> {
                    request.requestMatchers("/api/slot/**").permitAll();
                    request.requestMatchers("/api/department/**").permitAll();
                    request.requestMatchers("/api/working/**").permitAll();
                    request.requestMatchers("/api/qualification/**").permitAll();
                    request.requestMatchers("/api/news/**").permitAll();
                    request.requestMatchers("/api/feedback/**").permitAll();
                    request.requestMatchers("/api/user/**").permitAll();
                    request.requestMatchers("/api/doctor/**").permitAll();
                    request.requestMatchers("/api/contact/**").permitAll();
                    request.requestMatchers("/api/patient/**").permitAll();
                    request.requestMatchers("/api/schedules/**").permitAll();
                    request.requestMatchers("/api/appointment/**").permitAll();
                    request.requestMatchers("/api/medical/**").permitAll();
                    request.requestMatchers("/api/report/**").permitAll()
                            .anyRequest().authenticated();
                })
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(authenticationMiddleware, UsernamePasswordAuthenticationFilter.class)
                .cors(configurer -> new CorsConfiguration().applyPermitDefaultValues());
        return http.build();
    }

}
