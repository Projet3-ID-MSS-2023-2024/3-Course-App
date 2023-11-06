package com.example.courseapp.models;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name="results")
@EqualsAndHashCode
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Resultat {
    /*** Définitions des attributs***/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Time temps;

    private String abandon;

    /*** Laisaion avec la table course ***/
    @ManyToOne
    @JoinColumn(name="id_course")
    private Course course;

    /*** Laisaion avec la table user ***/
    @ManyToOne
    @JoinColumn(name="id_utilisateur")
    private Utilisateur utilisateur;
}
