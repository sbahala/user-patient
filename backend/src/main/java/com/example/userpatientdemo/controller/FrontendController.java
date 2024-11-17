package com.example.userpatientdemo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import org.springframework.http.MediaType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.StreamUtils;

@Controller
public class FrontendController {

    @GetMapping(value = {
            "/",
            "/login",
            "/register",
            "/dashboard",
            "/patients",
            "/patients/*"
    })
    public ResponseEntity<byte[]> serveIndex() throws IOException {
        Resource resource = new ClassPathResource("static/index.html");
        byte[] content = StreamUtils.copyToByteArray(resource.getInputStream());

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(content);
    }
}

