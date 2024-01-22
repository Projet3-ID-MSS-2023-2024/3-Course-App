package com.example.courseapp.TestRepo;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.models.Utilisateur;
import com.example.courseapp.repo.ResultatRepo;
import com.example.courseapp.repo.UtilisateurRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TestResultatRepo {

    @Autowired
    ResultatRepo repoResultat;

    @Autowired
    UtilisateurRepo repoUtilisateur;

    /*** Test pour récupérer tous les résultats et voir si la liste n'est pas vide ***/
    @Test
    public void getAllResultat(){
        List<Resultat> listResultats = repoResultat.findAll();
        assertTrue(listResultats.size()!=0);
    }

    /*** Test pour récupérer tous les résultats et voir si la liste n'est pas null ***/
    @Test
    public void getAllResultatNotNull(){
        List<Resultat> listResultats = repoResultat.findAll();
        assertTrue(listResultats != null);
    }

    /*** Test pour récupérer un résultat par l'id et voir si le résultat n'est pas vide ***/
    @Test
    public void getResultat(){
        Optional<Resultat> resultat = repoResultat.findById(1);
        assertTrue(!resultat.isEmpty());
    }

    /*** Test pour récupérer un résultat par l'id et voir si le résultat n'est pas null ***/
    @Test
    public void getResultatNotNull(){
        Optional<Resultat> resultat = repoResultat.findById(1);
        assertTrue(resultat != null);
    }

    /*** Test pour récupérer les résultat par l'id du user et vérifie si les résultats ne sont pas vides ***/
    @Test
    public void getResultatByUser(){
        Optional<Utilisateur> user = repoUtilisateur.findById(1);
        List<Resultat> resultats = repoResultat.findAllByUtilisateur(user);
        assertTrue(!resultats.isEmpty());
    }

    /*** Test pour récupérer les résultat par l'id du user et vérifie si le résultats ne sont pas null ***/
    @Test
    public void getResultatByUserNotNull(){
        Optional<Utilisateur> user = repoUtilisateur.findById(1);
        List<Resultat> resultats = repoResultat.findAllByUtilisateur(user);
        assertTrue(resultats != null);
    }

    /*** Test pour récupérer les résultats par l'id du user et vérifie si le nombre de résultats correspond aux nombre de courses payées par ce user ***/
    @Test
    public void getResultatByUserSize(){
        Optional<Utilisateur> user = repoUtilisateur.findById(1);
        List<Resultat> resultats = repoResultat.findAllByUtilisateur(user);
        assertTrue(resultats.size() == 3);
    }

    /*** Test pour récupérer un résultat par l'id du user et vérifie si la course correspondant est bien celle payée ***/
    @Test
    public void getResultatByUserCourse() {
        Optional<Utilisateur> user = repoUtilisateur.findById(1);
        List<Resultat> resultats = repoResultat.findAllByUtilisateur(user);
        assertEquals(2, resultats.get(0).getCourse().getId());
        assertEquals(1, resultats.get(1).getCourse().getId());
        assertEquals(3, resultats.get(2).getCourse().getId());
    }
}
