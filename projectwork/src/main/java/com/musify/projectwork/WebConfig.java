package com.musify.projectwork; // Use the appropriate package

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Adjust this to match your API paths
                .allowedOrigins("http://localhost:8080") // React app URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}