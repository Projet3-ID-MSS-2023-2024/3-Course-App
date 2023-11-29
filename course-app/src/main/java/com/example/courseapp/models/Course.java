package com.example.courseapp.models;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalTime;
import java.util.Date;


@Entity
@Table(name="courses")
@EqualsAndHashCode
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    /*** Définitions des attributs***/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String titre;

    @Column(nullable = false)
    private double prix;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private LocalTime heure;


    /*** Laisaions avec la table adress ***/
    @ManyToOne
    @JoinColumn(name="id_depart")
    private Adresse adresse;

    @ManyToOne
    @JoinColumn(name="id_arrivee")
    private Adresse adresse1;

    /*** Liaison avec la table utilisateur => On ne fait passer que les organisateur ***/
    @ManyToOne
    @JoinColumn(name="id_organisateur")
    private Utilisateur utilisateur;

}
