package com.musify.projectwork.service;

import org.springframework.stereotype.Component;

import io.github.cdimascio.dotenv.Dotenv;

@Component
public class SpotifyConfig {

    Dotenv dotenv = Dotenv.configure()
            .directory("./")
            .load();

    private String clientId = dotenv.get("SPOTIFY_CLIENT_ID");

    // @Value("${SPOTIFY_CLIENT_SECRET}")
    private String clientSecret =dotenv.get("SPOTIFY_CLIENT_SECRET");

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }
}