package com.example.userpatientdemo.controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class HealthCheck {

    @GetMapping("/check")
    public String healthCheck() {
        return "Server is up and running!";
    }
}
