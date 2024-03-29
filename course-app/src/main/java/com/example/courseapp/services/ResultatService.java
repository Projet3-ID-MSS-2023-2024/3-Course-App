package com.example.courseapp.services;

import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.models.Resultat;
import java.util.Optional;
import java.util.List;

public interface ResultatService {

    /*** Methode pour récupérer des Résultats pour une course ***/
    public List<Resultat> getAllResultByCourseId(int id);

    /*** Methode d'ajout de résultat ***/
    public Resultat add(Resultat resultat);

    /*** Methode pour récupérer des Résultats pour un user ***/
    public List<Resultat> getResultatsByUser(Optional<Utilisateur> user);

    public List<Resultat>getAllResultByUser(Optional<Utilisateur> user);

    public List<Resultat> getAllResultByCourseIdAndAbandon(int id);

    public List<Resultat> getAllResultByCourseIdNotAbandon(int id);

    public Resultat update(Resultat resultat);
}
