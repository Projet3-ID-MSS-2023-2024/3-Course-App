package com.example.courseapp.TestService;

import com.example.courseapp.models.Resultat;
import com.example.courseapp.repo.CourseRepo;
import com.example.courseapp.repo.ResultatRepo;
import com.example.courseapp.repo.UtilisateurRepo;
import com.example.courseapp.services.ResultatService;
import com.example.courseapp.services.ResultatServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNotNull;

@SpringBootTest
public class TestResultatService {
    @Autowired
    ResultatRepo resultatRepo;
    @Autowired
    CourseRepo courseRepo;
    @Autowired
    UtilisateurRepo userRepo;
    @Autowired
    ResultatServiceImpl resultatService;

   /*** @Test
    public void testAjoutResult(){

        Resultat resultat = new Resultat();
        resultat.setId(9);
        resultat.setAbandon("Abandon");
        resultat.setTemps(null);
        resultat.setUtilisateur(userRepo.findById(1).get());
        resultat.setCourse(courseRepo.findById(1).get());
        resultatService.add(resultat);

        Resultat resultatDb= resultatRepo.findById(1).get();

        assertNotNull(resultatDb);
        assertEquals("Abandon", resultatDb.getAbandon());
    }

    @Test
    public void testUpdate() {

    Resultat resultat= resultatRepo.findById(1).get();
    resultat.setAbandon("Abandon");
    Resultat resultatMaj=resultatService.update(resultat);

    assertNotNull(resultatMaj);
    Assertions.assertEquals(resultat, resultatMaj);
    }***/
}
