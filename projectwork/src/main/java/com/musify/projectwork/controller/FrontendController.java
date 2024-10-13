package com.musify.projectwork.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/{path:[^\\.]*}") // Matches all paths except ones with a period (e.g., .css, .js)
    public String index() {
        return "forward:/index.html"; // Forward to React's index.html
    }
}