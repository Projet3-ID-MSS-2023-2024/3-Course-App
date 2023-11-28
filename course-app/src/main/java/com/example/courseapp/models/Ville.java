package com.example.courseapp.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Setter
@Getter
@EqualsAndHashCode
@Table(name="ville")
public class Ville implements Serializable {
    /*** Définitions des attributs ***/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ville_id;


    private String nom;


    private int code_postale;

    /*** Constructeur ***/
    public Ville(){}
    public Ville(int ville_id, String nom, int code_postale) {
        this.ville_id = ville_id;
        this.nom = nom;
        this.code_postale = code_postale;

    }


}
