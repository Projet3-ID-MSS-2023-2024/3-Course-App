package com.example.courseapp.services;

import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.models.Resultat;
import java.util.Optional;
import java.util.List;

public interface ResultatService {

    /*** Methode pour récupérer des Résultats pour une course ***/

    public List<Resultat> getAllResultByCourseId(int id);

    public Resultat add(Resultat resultat);

    public List<Resultat> getResultatsByUser(Optional<Utilisateur> user);

    public List<Resultat>getAllResultByUser(Optional<Utilisateur> user);
}
