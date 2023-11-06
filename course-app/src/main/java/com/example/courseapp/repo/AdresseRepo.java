package com.example.courseapp.repo;

import com.example.courseapp.models.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdresseRepo extends JpaRepository<Adresse, Long> {
    /*** Récupération de toutes les adresses en DB ***/
    @Query("select a from Adresse a")
    List<Adresse> getAllAdresse();

    /*** Récupération d'une adresse par son id ***/
    @Query("select a from Adresse a where a.id = :id")
    Adresse getAdresseById(int id);


}
