package com.example.userpatientdemo.model;

import lombok.Data;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "patients")

public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    @Column(unique = true) // Ensure that email is unique in the database
    private String email;

    @NotNull(message = "Date of birth is mandatory")
    @Past(message = "Date of birth must be in the past") // Ensures dob is in the past
    @DateTimeFormat(pattern = "yyyy-MM-dd")  // Optional, can be used to specify the format
    private LocalDate dob;  // LocalDate automatically handles the date format

}
