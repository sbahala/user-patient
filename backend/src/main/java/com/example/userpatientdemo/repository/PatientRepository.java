package com.example.userpatientdemo.repository;

import com.example.userpatientdemo.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByNameStartingWithIgnoreCase(String prefix);
    // Method to find a patient by their email
    Optional<Patient> findByEmail(String email);

    // Method to find patients whose name starts with a given prefix
    List<Patient> findByNameStartingWith(String namePrefix);
}