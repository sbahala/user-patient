package com.example.userpatientdemo.repository;

import com.example.userpatientdemo.model.Patient;
import com.example.userpatientdemo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
