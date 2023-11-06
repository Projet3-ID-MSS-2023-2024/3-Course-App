package com.example.courseapp.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false)
    private String email;

    private String mdp;

    private String code;

    @Column(nullable = false)
    private boolean isActive;

    /*** Liaison avec l'enumération de la classe role***/
    @Enumerated(EnumType.STRING)
    @ElementCollection
    private List<Role> role;
}
