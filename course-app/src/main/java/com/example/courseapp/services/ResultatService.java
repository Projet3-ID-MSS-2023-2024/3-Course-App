package com.example.courseapp.services;

import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.models.Resultat;
import java.util.Optional;
import java.util.List;

public interface ResultatService {

    public List<Resultat> getAllResultByCourseId(int id);

    public Resultat add(Resultat resultat);

    public List<Resultat> getResultatsByUser(Optional<Utilisateur> user);
}
