package com.example.courseapp.services;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.ResultatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultatServiceImpl implements ResultatService {

    /*** initialisation du répo ***/
    @Autowired
    ResultatRepo resultatRepo;

    @Override
    public Resultat add(Resultat resultat) {
        return resultatRepo.save(resultat);
    }

    @Override
    public List<Resultat> getResultatsByUser(Optional<Utilisateur> user) {
        return resultatRepo.findAllByUtilisateur(user);
    }

    /*** Récupération des résultats pour une course ***/
    @Override
    public List<Resultat> getAllResultByCourseId(int id) {
        return resultatRepo.getAllByIdCourse(id);
    }
}