package com.example.courseapp.services;

import com.example.courseapp.dto.UserResponse;
import com.example.courseapp.models.Resultat;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.ResultatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ResultatServiceImpl implements ResultatService {

    /*** initialisation du répo ***/
    @Autowired
    ResultatRepo resultatRepo;

    /*** Ajout d'un résultat en db (après paiement réussi dans le front) ***/
    @Override
    public Resultat add(Resultat resultat) {
        return resultatRepo.save(resultat);
    }

    /*** Récupération des résultats pour un user ***/
    @Override
    public List<Resultat> getResultatsByUser(Optional<Utilisateur> user) {
        return resultatRepo.findAllByUtilisateur(user);
    }

    /***  Récupération des résultats pour un User (avec soit abandon, soit temps)   ***/
    @Override
    public List<Resultat> getAllResultByUser(Optional<Utilisateur> user) {
        List<Resultat> resultatsNoFilter = resultatRepo.findAllByUtilisateur(user);
        int i=0;
        int j=0;
        List<Resultat> resultats= new ArrayList<>();
        while (i<resultatsNoFilter.size()){
            if(resultatsNoFilter.get(i).getAbandon()!=null || resultatsNoFilter.get(i).getTemps()!=null){
                if(resultatsNoFilter.get(i).getCourse().isSupprimer() != true){
                    resultats.add(j,resultatsNoFilter.get(i));
                    j++;
                }
            }
            i++;
        }
        return resultats;
    }
    /*** Récupération des résultats pour une course ***/
    @Override
    public List<Resultat> getAllResultByCourseId(int id) {
        return resultatRepo.getAllByIdCourse(id);
    }

    @Override
    public List<Resultat> getAllResultByCourseIdAndAbandon(int id) {
        return resultatRepo.getAllByIdCourseAndAbandon(id);
    }

    @Override
    public List<Resultat> getAllResultByCourseIdNotAbandon(int id) {
        return resultatRepo.getAllByIdCourseNotAbandon(id);
    }
}