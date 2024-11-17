package com.example.userpatientdemo.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
public class JWTUtil {

    private static final String secretKeyBase64 = "S3cr3tK3yForHS256Algorithm1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ==";  // Your generated key

    private static final Key secretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKeyBase64));
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    // Generate JWT Token
    public String generateToken(Map<String, String> userData) {
        try {
            // Convert the userData map to JSON string for payload
            Claims claims = Jwts.claims();
            claims.putAll(userData);  // Add userData as claims

            return Jwts.builder()
                    .setClaims(claims)  // Use setClaims instead of setPayload
                    .setSubject(userData.get("username"))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        } catch (Exception e) {
            throw new RuntimeException("Error generating token", e);
        }
    }

    // Validate JWT Token
    public boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    // Extract Username from Token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Check if Token is Expired
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Extract Claims from Token
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}
