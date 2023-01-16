package com.example.sample;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                // Permit access to static resources - typically files output by the frontend build
                .antMatchers("/", "/static/**", "/*.txt", "/*.ico", "/*.png").permitAll()
                .anyRequest().authenticated()
                .and()
                .httpBasic();

        // Sends CSRF token in Cookie and checks for it in X-XSRF-TOKEN header
        http.csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        return http.build();
    }

}
