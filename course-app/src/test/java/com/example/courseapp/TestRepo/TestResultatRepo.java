package com.example.courseapp.TestRepo;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.repo.ResultatRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TestResultatRepo {

    @Autowired
    ResultatRepo repoResultat;

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
}
