package com.example.userpatientdemo.service;

import com.example.userpatientdemo.model.Patient;
import com.example.userpatientdemo.model.User;
import com.example.userpatientdemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Here, you can add password encoding logic and other validations.
        Optional<User> existingPatient = userRepository.findByEmail(user.getEmail());
        if (existingPatient.isPresent()) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        // Save the new patient if email is unique
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        // Find the user by username
        Optional<User> userOpt = userRepository.findByEmail(email);

        // Check if the user exists and if the password matches
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Directly compare the plain-text password with the stored password
            if (password.equals(user.getPassword())) {
                return Optional.of(user); // Password matches, return the user
            }
        }

        // If no match, return empty Optional
        return Optional.empty();
    }
}
