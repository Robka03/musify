package com.musify.projectwork.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SpotifyConfig {

    @Value("${SPOTIFY_CLIENT_ID}")
    private String clientId;

    @Value("${SPOTIFY_CLIENT_SECRET}")
    private String clientSecret;

    public String getClientId() {
        return clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }
}