package com.example.courseapp.services;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.models.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface ResultatService {

    public Resultat add(Resultat resultat);

    public List<Resultat> getResultatsByUser(Optional<Utilisateur> user);

    public void deleteResultats(int id);
}
