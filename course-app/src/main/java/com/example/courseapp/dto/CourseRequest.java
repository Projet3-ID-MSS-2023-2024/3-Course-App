package com.example.courseapp.dto;

import com.example.courseapp.models.Adresse;
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
    private Adresse adresse;
    private Adresse adresse1;
    private String utilisateur;
}
