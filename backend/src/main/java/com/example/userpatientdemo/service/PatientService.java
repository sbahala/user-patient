package com.example.userpatientdemo.service;

import com.example.userpatientdemo.model.Patient;
import com.example.userpatientdemo.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient addPatient(Patient patient) {
        // Check if the email already exists in the database
        Optional<Patient> existingPatient = patientRepository.findByEmail(patient.getEmail());
        if (existingPatient.isPresent()) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        // Save the new patient if email is unique
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patient) {
        // Ensure that the ID in the request matches an existing patient
        if (!patientRepository.existsById(id)) {
            throw new IllegalArgumentException("Patient not found.");
        }
        patient.setId(id);
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new IllegalArgumentException("Patient not found.");
        }
        patientRepository.deleteById(id);
    }

    public List<Patient> getPatientsByNameStartingWith(String prefix) {
        return patientRepository.findByNameStartingWith(prefix.toLowerCase());
    }
}
