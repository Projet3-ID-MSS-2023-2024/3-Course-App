package com.example.courseapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseRequest {
    private String titre;
    private double prix;
    private Date date;
    private LocalTime heure;
    private String adresse;
    private String adresse1;
    private String utilisateur;
}
