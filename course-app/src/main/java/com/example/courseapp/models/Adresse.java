package com.example.courseapp.models;


import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@EqualsAndHashCode
@Builder
@Table(name="adresse")
public class Adresse {
    /*** Définitions des attributs***/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String rue;

    private String latitude;

    private String longitude;

    /*** Laisaion avec la table ville ***/
    @Getter@Setter
    @ManyToOne
    @JoinColumn(name="ville_id")
    private Ville ville;

    /*** Liaison avec la table course ***/


    /*** Constructeur ***/
    public Adresse() {}

    public Adresse(int id, String rue, String latitude, String longitude, Ville ville) {
        this.id = id;
        this.rue = rue;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ville = ville;
    }


}
